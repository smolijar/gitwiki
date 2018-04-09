const Keyv = require('keyv');
const { getUserInfo } = require('./github');
const logger = require('../src/logger');
const { getConfig } = require('../config');
const { assoc } = require('ramda');

const users = new Keyv(getConfig('storage'), { namespace: 'users' });
users.on('error', logger.error);

const transformUser = user => ({
  avatar: user.avatar_url,
  username: user.login,
  accessToken: user.accessToken,
  name: user.name,
});

module.exports.getUser = accessToken => users.get(accessToken)
  .then((user) => {
    if (!user) {
      return getUserInfo(`token ${accessToken}`)
        .then(assoc('accessToken', accessToken))
        .then(transformUser)
        .then((u) => { users.set(accessToken, u); return u; });
    }
    return user;
  });
