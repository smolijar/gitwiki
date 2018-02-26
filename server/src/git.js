const NodeGit = require('nodegit');
const path = require('path');
const _ = require('lodash');

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
    const [, group, name] = ref.split('/');
    return { ref, group, name };
  }));

module.exports.browse = (repo, treePath = null) => {
  const formatEntry = entry => ({
    name: entry.name(),
    path: entry.path(),
    isDirectory: entry.isDirectory(),
  });
  const formatTree = tree => ({ tree: _.orderBy(tree.entries().map(formatEntry), ['isDirectory', 'name'], ['desc', 'asc']) });
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

  return repo.getHeadCommit()
    .then(commit => commit.getTree())
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
