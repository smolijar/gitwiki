const NodeGit = require('nodegit');

module.exports = (uri, dest, getCred) => {
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
