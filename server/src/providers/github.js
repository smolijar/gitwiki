const { map, assoc } = require('ramda');
const fetch = require('isomorphic-unfetch');

const listRepos = (req) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return Promise.resolve([]);
  }
  return fetch('https://api.github.com/user/repos', { headers: { authorization } })
    .then(x => x.json())
    .then(map(assoc('provider', 'github')));
};

module.exports = { listRepos };
