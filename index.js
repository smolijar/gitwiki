const NodeGit = require('nodegit');
const path = require('path');
const fs = require('fs');

const promised = (fn, thisCtx) =>
  (...args) => new Promise(
    (resolve, reject) =>
      fn.call(thisCtx, ...args, (err, ...results) =>
        err ? reject(err) : resolve(results)
      )
  )

function getGitoliteCredentials() {
  return promised(fs.readFile)('.gitwiki.config.json', 'utf-8')
    .then(config => JSON.parse(config))
    .then(config => NodeGit.Cred.sshKeyNew(
      config.ssh.user,
      config.ssh.public,
      config.ssh.private,
      config.ssh.passphrase));
}

const url = "git@localhost:gitolite-admin";
const dest = "./tmp";
const cloneOpts = {};
getGitoliteCredentials()
  .then(cred => {
    cloneOpts.fetchOpts = {
      callbacks: {
        credentials: function (url, userName) {
          return cred;
        }
      }
    };
    NodeGit.Clone(url, dest, cloneOpts).then(function (repo) {
      console.log("Cloned " + path.basename(url) + " to " + repo.workdir());
    }).catch(function (err) {
      console.log(err);
    });
  })
