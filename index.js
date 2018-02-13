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

const url = "git@localhost:gitolite-admin";
const dest = "./tmp";
const cloneOpts = {};
cloneOpts.fetchOpts = {
  callbacks: {
    credentials: function (url, userName) {
      return NodeGit.Cred.sshKeyFromAgent(userName);
    }
  }
};
NodeGit.Clone(url, dest, cloneOpts).then(function (repo) {
  console.log("Cloned " + path.basename(url) + " to " + repo.workdir());
}).catch(function (err) {
  console.log(err);
});
