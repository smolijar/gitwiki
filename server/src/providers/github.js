const { map, assoc } = require('ramda');
const fetch = require('isomorphic-unfetch');
const types = require('./types');
const git = require('../git');
const { Cred } = require('nodegit');

const listRepos = (req) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return Promise.resolve([]);
  }
  return fetch('https://api.github.com/user/repos', { headers: { authorization } })
    .then(x => x.json())
    .then(map(assoc('provider', 'github')));
};

const getLocalRepoWd = repoPath => `/tmp/gitwiki/github/${repoPath}`;

const getRepository = (user, repoName) => {
  const uri = `https://github.com/${user.username}/${repoName}`;
  const dest = getLocalRepoWd(repoName);
  const getCred = () => Cred.userpassPlaintextNew('<personal access token>', 'x-oauth-basic');
  return git.getRepo(uri, dest, getCred);
};

const provider = types.GITHUB;

module.exports = { listRepos, provider, getRepository };
