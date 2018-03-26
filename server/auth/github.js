const querystring = require('querystring');
const config = require('../../.gitwiki.config');
const fetch = require('isomorphic-unfetch');
const {
  path, merge, compose, prop,
} = require('ramda');

console.log(config);
const githubConfig = path('auth.oauth2.github'.split('.'), config);
console.log(githubConfig);

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
