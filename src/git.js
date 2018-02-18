const NodeGit = require('nodegit');
const path = require('path');

module.exports.getLocalRepository = (repoPath, user) => {
  // TODO check gitolite authorization
  const url = `git@localhost:${repoPath}`;
  const dest = "./tmp";
  const cloneOpts = {};
  cloneOpts.fetchOpts = {
    callbacks: {
      credentials: function (url, userName) {
        return NodeGit.Cred.sshKeyFromAgent(userName);
      }
    }
  };
  return NodeGit.Clone(url, dest, cloneOpts)
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