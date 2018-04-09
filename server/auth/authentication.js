const { getUserInfo } = require('./github');
const { assoc } = require('ramda');
const { users } = require('../storage');

const transformUser = user => ({
  avatar: user.avatar_url,
  username: user.login,
  accessToken: user.accessToken,
  name: user.name,
  githubPersonalAccessTokenSet: Boolean(user.githubPersonalAccessTokenSet),
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
