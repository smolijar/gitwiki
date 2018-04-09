const {
  map, compose, objOf, merge,
} = require('ramda');
const gitolite = require('../gitolite');
const git = require('../git');
const types = require('./types');
const { Cred } = require('nodegit');


const entryFromName = compose(merge({ provider: 'local' }), objOf('name'));

const listRepos = req => gitolite.listRepos(req)
  .then(map(entryFromName));

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
