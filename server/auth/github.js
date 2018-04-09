const querystring = require('querystring');
const { getConfig } = require('../config');
const fetch = require('isomorphic-unfetch');
const {
  merge, compose, prop,
} = require('ramda');

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
