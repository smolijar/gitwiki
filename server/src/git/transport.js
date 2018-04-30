const NodeGit = require('nodegit');
const {
  compose,
  curry,
  assocPath,
  __,
} = require('ramda');

async function updateRemoteRefs(repo) {
  await repo.fetchAll(repo.fetchOpts);
  await repo.mergeBranches('master', 'origin/master');
  return repo;
}

async function retrieveCachedRepo(dest, setup) {
  const repository = await NodeGit.Repository.open(dest);
  return compose(updateRemoteRefs, setup)(repository);
}

const setupRepo = curry((cloneOpts, repo) => {
  const repository = repo;
  repository.callbacks = cloneOpts.fetchOpts.callbacks;
  repository.fetchOpts = cloneOpts.fetchOpts;
  return repository;
});

const getcloneOpts = assocPath(['fetchOpts', 'callbacks', 'credentials'], __, {});

const getRepo = (uri, dest, getCred) => {
  const cloneOpts = getcloneOpts(getCred);
  const setup = setupRepo(cloneOpts);
  return NodeGit.Clone(uri, dest, cloneOpts)
    .then(setup)
    .catch((e) => {
      if (e.errno === NodeGit.Error.CODE.EEXISTS) {
        return retrieveCachedRepo(dest, setup);
      }
      throw e;
    });
};

async function pushOrigin(repo) {
  const remoteRef = await repo.getRemote('origin');
  await remoteRef.push(['refs/heads/master:refs/heads/master'], {
    callbacks: repo.callbacks,
  });
}

module.exports = { getRepo, pushOrigin };
