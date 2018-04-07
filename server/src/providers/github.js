const { map, assoc } = require('ramda');
const fetch = require('isomorphic-unfetch');
const types = require('./types');

const listRepos = (req) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return Promise.resolve([]);
  }
  return fetch('https://api.github.com/user/repos', { headers: { authorization } })
    .then(x => x.json())
    .then(map(assoc('provider', 'github')));
};

const provider = types.GITHUB;


module.exports = { listRepos, provider };
