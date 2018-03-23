const { Issuer } = require('openid-client');
const querystring = require('querystring');
const config = require('../../../.gitwiki.config');
const {
  path, merge, compose, prop,
} = require('ramda');


const githubConfig = path('auth.oidc.github'.split('.'), config);

module.exports.getRedirectUri = () => {
  const issuer = new Issuer({
    authorization_endpoint: 'https://github.com/login/oauth/authorize',
    token_endpoint: 'https://github.com/login/oauth/access_token',
    userinfo_endpoint: 'https://api.github.com/user',
  });
  const client = new issuer.Client(githubConfig);
  const url = client.authorizationUrl({
    redirect_uri: 'http://localhost:3000/api/v1/auth/github/cb',
    scope: 'repo read:user',
  });
  return url;
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
