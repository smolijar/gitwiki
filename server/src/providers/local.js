const {
  map, compose, objOf, merge, zip, head, pipe, filter, propOr, last,
} = require('ramda');
const gitolite = require('../gitolite');
const git = require('../git');
const types = require('./types');
const { Cred } = require('nodegit');

const username = propOr('@all', 'username');

const entryFromName = compose(merge({ provider: 'local' }), objOf('name'));

const listRepos = usr => gitolite.listRepos(usr)
  .then(repos => Promise.all(repos.map(repo => gitolite.access(repo, username(usr), 'R')))
    .then(zip(repos))
    .then(pipe(
      filter(last),
      map(head),
      map(entryFromName),
    )));
const getLocalRepoWd = repoPath => `/tmp/gitwiki/local/${repoPath}`;

const getRepository = (user, repoPath) => {
  // TODO check gitolite authorization
  const uri = `git@localhost:${repoPath}`;
  const dest = getLocalRepoWd(repoPath);
  const getCred = (url, userName) => Cred.sshKeyFromAgent(userName);
  return git.getRepo(uri, dest, getCred);
};

const provider = types.LOCAL;

module.exports = { listRepos, getRepository, provider };
