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