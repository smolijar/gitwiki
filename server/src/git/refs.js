const NodeGit = require('nodegit');

const { zip } = require('ramda');

const parseRefName = (ref) => {
  const [, group, ...compoundName] = ref.split('/');
  const name = compoundName[compoundName.length - 1];
  return {
    ref, group, name, compoundName: compoundName.join('/'),
  };
};

const getRefCompoundName = (ref) => {
  const { compoundName } = parseRefName(ref);
  return compoundName;
};

async function refs(repo) {
  const references = await repo.getReferences(NodeGit.Reference.TYPE.LISTALL);
  return references
    .filter(r => !r.isRemote())
    .map(r => r.toString())
    .map(parseRefName);
}

async function branchesAndUpstreams(repo) {
  const references = await repo.getReferences(NodeGit.Reference.TYPE.LISTALL);
  const branches = references.filter(r => r.isBranch());
  const upstreams = await Promise.all(branches.map(b =>
    NodeGit.Branch.upstream(b)));
  return zip(
    branches,
    upstreams,
  );
}

const getOrCreateBranch = (repo, name, oid) => repo.getBranch(name)
  .catch((e) => {
    if (e.errno === NodeGit.Error.CODE.ENOTFOUND) {
      return repo.createBranch(name, oid);
    }

    throw e;
  });

async function createLocalRefs(repo) {
  const references = await repo.getReferences(NodeGit.Reference.TYPE.LISTALL);
  const remoteRefs = references.filter(r => r.isRemote());
  return Promise.all(remoteRefs.map((remoteRef) => {
    const oid = remoteRef.target();
    const upstreamName = getRefCompoundName(remoteRef.toString());
    const { name } = parseRefName(remoteRef.toString());
    return getOrCreateBranch(repo, name, oid)
      .then(b => NodeGit.Branch.setUpstream(b, upstreamName));
  }));
}

const findRef = (repo, name) => refs(repo)
  .then(rs => rs.find(r => r.name === name));

module.exports = {
  refs,
  findRef,
  createLocalRefs,
  branchesAndUpstreams,
  getRefCompoundName,
};
