const querystring = require('querystring');
const fetch = require('isomorphic-unfetch');
const {
  merge, compose, prop, assoc, apply, head,
} = require('ramda');
const { getConfig } = require('../config');
const { users, tokens } = require('../storage');
const git = require('../src/git');
const localProvider = require('../src/providers/local');

const githubConfig = getConfig('auth.oauth2.github');

module.exports.getRedirectUri = () => {
  const query = querystring.stringify({
    client_id: githubConfig.client_id,
    scope: 'repo user:read user:email read:public_key',
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

async function storeSshKeys(authHeader) {
  const options = { headers: { authorization: authHeader } };
  const [user, keys] = await Promise.all([
    fetch('https://api.github.com/user', options)
      .then(res => res.text())
      .then(body => JSON.parse(body)),
    fetch('https://api.github.com/user/keys', options)
      .then(res => res.text())
      .then(body => JSON.parse(body)),
  ]);
  const pathKeys = keys.map(({ id, key }) => ([`keydir/github/${id}/${user.login}`, key]));
  const changes = pathKeys.map(([path, key]) => ({ path, content: key }));
  const repo = await localProvider.getRepository(null, 'gitolite-admin');
  return git.commitAndPush(repo, { name: 'Gitwiki', email: 'gitwiki@gitwiki.com' }, changes, `Update user ${user.login}`)
}

module.exports.storeSshKeys = storeSshKeys;
