const NodeGit = require('nodegit');
const path = require('path');

const getLocalRepoWd = repoPath => `./tmp/${repoPath}`

module.exports.getLocalRepository = (repoPath, user) => {
  // TODO check gitolite authorization
  const url = `git@localhost:${repoPath}`;
  const dest = getLocalRepoWd(repoPath);
  const cloneOpts = {};
  cloneOpts.fetchOpts = {
    callbacks: {
      credentials: function (url, userName) {
        return NodeGit.Cred.sshKeyFromAgent(userName);
      }
    }
  };
  return NodeGit.Clone(url, dest, cloneOpts)
    .catch(e => {
      // exists and is not an empty directory
      if (e.errno === -4) {
        return NodeGit.Repository.open(dest)
      }
    })
}

module.exports.browse = (repo, user, path = null) => {
  const formatTree = tree => tree.entries().map(e => e.path());
  const formatBlob = entry => entry.path();
  return repo.getHeadCommit()
    .then(commit => commit.getTree())
    .then(tree => {
      if (path) {
        return tree.getEntry(path)
          .then(entry => {
            if (entry.isBlob()) {
              return formatBlob(entry);
            }
            else {
              return entry.getTree()
                .then(formatTree);
            }
          })

      }
      return formatTree(tree);
    })
}