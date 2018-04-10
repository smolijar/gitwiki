const querystring = require('querystring');
const fetch = require('isomorphic-unfetch');
const {
  merge, compose, prop, assoc, apply, head,
} = require('ramda');
const { getConfig } = require('../config');
const { users, tokens } = require('../storage');

const githubConfig = getConfig('auth.oauth2.github');

module.exports.getRedirectUri = () => {
  const query = querystring.stringify({
    client_id: githubConfig.client_id,
    scope: 'repo user:read user:email',
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

module.exports.getUserInfo = (authHeader) => {
  const options = { headers: { authorization: authHeader } };
  return Promise.all([
    fetch('https://api.github.com/user/emails', options)
      .then(x => x.json())
      .then(compose(prop('email'), head)),
    fetch('https://api.github.com/user', options)
      .then(x => x.json()),
  ])
    .then(apply(assoc('email')));
};

module.exports.savePersonalToken = (user, token) => {
  users.set(user.accessToken, { ...user, githubPersonalAccessTokenSet: true });
  tokens.set(user.username, token);
};

module.exports.getPersonalToken = user => tokens.get(user.username);
