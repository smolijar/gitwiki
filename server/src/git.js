const NodeGit = require('nodegit');
const path = require('path');
const {
  sortWith, ascend, descend, prop, propOr,
} = require('ramda');

const getLocalRepoWd = repoPath => `/tmp/gitwiki/${repoPath}`;

module.exports.getLocalRepository = (repoPath) => {
  // TODO check gitolite authorization
  const uri = `git@localhost:${repoPath}`;
  const dest = getLocalRepoWd(repoPath);
  const cloneOpts = {};
  cloneOpts.fetchOpts = {
    callbacks: {
      credentials(url, userName) {
        return NodeGit.Cred.sshKeyFromAgent(userName);
      },
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
