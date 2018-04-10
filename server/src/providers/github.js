const { map, assoc } = require('ramda');
const fetch = require('isomorphic-unfetch');
const types = require('./types');
const git = require('../git');
const { Cred } = require('nodegit');
const { getPersonalToken } = require('../../auth/github');

const listRepos = (user) => {
  if (!user.githubPersonalAccessTokenSet) {
    return Promise.resolve([]);
  }
  return fetch('https://api.github.com/user/repos', { headers: { authorization: `token ${user.accessToken}` } })
    .then(x => x.json())
    .then(map(assoc('provider', 'github')));
};

const getLocalRepoWd = repoPath => `/tmp/gitwiki/github/${repoPath}`;

const getRepository = (user, repoName) => getPersonalToken(user).then((personalAccessToken) => {
  const uri = `https://github.com/${user.username}/${repoName}`;
  const dest = getLocalRepoWd(repoName);
  const getCred = () => Cred.userpassPlaintextNew(personalAccessToken, 'x-oauth-basic');
  return git.getRepo(uri, dest, getCred);
});

const provider = types.GITHUB;

module.exports = { listRepos, provider, getRepository };
