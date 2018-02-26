const NodeGit = require('nodegit');
const _ = require('lodash');
const path = require('path');

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

module.exports.browse = (repo, treePath = null) => {
  const formatEntry = entry => ({
    name: entry.name(),
    path: entry.path(),
    isDirectory: entry.isDirectory(),
  });
  const base = { blob: null, tree: [] };
  const formatTree = tree => _.merge(base, { tree: tree.entries().map(formatEntry) });
  const formatBlob = entry => entry.getBlob()
    .then(blob => _.merge(base, {
      blob: { name: entry.name(), content: blob.toString() },
    }));
  return repo.getHeadCommit()
    .then(commit => commit.getTree())
    .then((tree) => {
      if (!treePath) return formatTree(tree);
      return tree.getEntry(treePath)
        .then((entry) => {
          if (entry.isBlob()) {
            return Promise.all([
              formatBlob(entry),
              tree.getEntry(path.normalize(`${treePath}/..`))
                .then(entry => entry.getTree())
                .then(formatTree),
            ])
              .then(([blob, tree]) => ({ blob: blob.blob, tree: tree.tree }));
          }
          return entry.getTree()
            .then(formatTree);
        });
    });
};
