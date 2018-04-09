const querystring = require('querystring');
const fetch = require('isomorphic-unfetch');
const {
  merge, compose, prop,
} = require('ramda');
const { getConfig } = require('../config');
const { users, tokens } = require('../storage');

const githubConfig = getConfig('auth.oauth2.github');

module.exports.getRedirectUri = () => {
  const query = querystring.stringify({
    client_id: githubConfig.client_id,
    scope: 'repo user:read',
  });
  return `https://github.com/login/oauth/authorize?${query}`;
};

module.exports.getAccessToken = (code) => {
  const params = querystring.stringify(merge(githubConfig, { code }));
  const url = `https://github.com/login/oauth/access_token/?${params}`;
  return fetch(url, {
    method: 'POST',
  })
    .then(response => response.text()
      .then(compose(prop('access_token'), querystring.parse)));
};

module.exports.getUserInfo = authHeader => fetch('https://api.github.com/user', { headers: { authorization: authHeader } })
  .then(x => x.json());

module.exports.savePersonalToken = (user, token) => {
  users.set(user.accessToken, { ...user, githubPersonalAccessTokenSet: true });
  tokens.set(user.username, token);
};

module.exports.getPersonalToken = user => tokens.get(user.username);
