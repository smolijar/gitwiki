const NodeGit = require('nodegit');
const path = require('path');
const tmp = require('tmp');
const promisify = require("promisify-node");
const fse = promisify(require("fs-extra"));
const ensureDir = promisify(fse.ensureDir);
const {
  sortWith, ascend, descend, prop, propOr, curry, compose
} = require('ramda');


module.exports.getRepo = (uri, dest, getCred) => {
  const cloneOpts = {};
  cloneOpts.fetchOpts = {
    callbacks: {
      credentials: getCred,
    },
  };
  return NodeGit.Clone(uri, dest, cloneOpts)
    .catch((e) => {
      let repository;
      // exists and is not an empty directory
      if (e.errno === -4) {
        return NodeGit.Repository.open(dest)
          // fetch does not return repo, must store
          .then((repo) => { repository = repo; return repo; })
          .then(repo => repo.fetchAll(cloneOpts.fetchOpts))
          .then(() => repository.mergeBranches('master', 'origin/master'))
          .then(() => repository);
      }
      throw e;
    });
};

module.exports.refs = repo => repo
  .getReferenceNames(NodeGit.Reference.TYPE.LISTALL)
  .then(refs => refs.map((ref) => {
    const [, group, ...compoundName] = ref.split('/');
    const name = compoundName[compoundName.length - 1];
    return {
      ref, group, name, compoundName: compoundName.join('/'),
    };
  }));

module.exports.findRef = (repo, name) => module.exports
  .refs(repo)
  .then(refs => refs.find(r => r.name === name));

module.exports.browse = (repo, treePath = null, ref = null) => {
  const formatEntry = entry => ({
    name: entry.name(),
    path: entry.path(),
    isDirectory: entry.isDirectory(),
  });
  const sortEntries = sortWith([descend(prop('isDirectory')), ascend(prop('name'))]);
  const formatTree = tree => ({ tree: sortEntries(tree.entries().map(formatEntry)) });
  const formatBlob = (blobEntry, rootTree) => {
    const dirPath = path.parse(treePath).dir;
    return Promise.all([
      blobEntry.getBlob()
        .then(blob => ({ ...formatEntry(blobEntry), content: blob.toString() })),
      dirPath === '' ? Promise.resolve(formatTree(rootTree)) : rootTree.getEntry(dirPath)
        .then(entry => entry.getTree())
        .then(formatTree),
    ])
      .then(([blob, { tree }]) => ({ blob, tree }));
  };

  const commit = ref ? module.exports
    .findRef(repo, ref)
    .then(r => repo.getReferenceCommit(propOr(ref, 'ref', r))) : repo.getHeadCommit();

  return commit
    .then(rev => rev.getTree())
    .then((tree) => {
      // if treePath is null, stay on root
      if (!treePath) return formatTree(tree);
      return tree.getEntry(treePath)
        .then((entry) => {
          if (entry.isBlob()) {
            return formatBlob(entry, tree);
          }
          return entry.getTree()
            .then(formatTree);
        });
    });
};

const getTmpDir = new Promise((res, rej) => {
  tmp.dir(function _tempDirCreated(err, path, cleanupCallback) {
    if (err) rej(err);
    res(path);
  });
})

const createSignature = (name, email) => NodeGit.Signature.create(name,
  email, new Date().getTime() / 1000, - new Date().getTimezoneOffset());

const applyChange = curry((repo, change) => {
  const absPath = path.join(repo.workdir(), change.path);
  return ensureDir(path.dirname(absPath))
    .then(fse.writeFile(absPath, change.content))
})

async function writeTree(repo, changes) {
  await Promise.all(changes.map(applyChange(repo)))
  const index = await repo.refreshIndex();
  const add = index.addByPath.bind(index);
  await Promise.all(changes.map(compose(add, prop('path'))))
  await index.write();
  return index.writeTree();
}

async function getReferenceCommit(repo, ref) {
  const referenceNode = await NodeGit.Reference.nameToId(repo, ref);
  return parentCommit = await repo.getCommit(referenceNode);
}

async function commit(repo, user, changes, message, refName = 'master') {
  const author = createSignature(user.name, user.email)
  const committer = author;
  const { ref } = await module.exports.findRef(repo, refName);

  // const tmpdir = await getTmpDir.then();
  
  const [oid, parentCommit] = await Promise.all([
    writeTree(repo, changes),
    getReferenceCommit(repo, ref)
  ]);

  const commitId = await repo.createCommit(ref, author, committer, message, oid, [parentCommit]);
}

module.exports.commit = commit;