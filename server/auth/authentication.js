const { getUserInfo, getPersonalToken } = require('./github');
const { assoc } = require('ramda');
const { users } = require('../storage');

const transformUser = user => ({
  avatar: user.avatar_url,
  username: user.login,
  accessToken: user.accessToken,
  name: user.name,
  githubPersonalAccessTokenSet: user.githubPersonalAccessTokenSet,
});

module.exports.getUser = accessToken => users.get(accessToken)
  .then((user) => {
    if (!user) {
      return Promise.all([
        getUserInfo(`token ${accessToken}`),
        getPersonalToken(accessToken),
      ])
        .then(([usr, token]) => ({ ...usr, githubPersonalAccessTokenSet: Boolean(token) }))
        .then(assoc('accessToken', accessToken))
        .then(transformUser)
        .then((u) => { users.set(accessToken, u); return u; });
    }
    return user;
  });
