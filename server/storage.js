const Keyv = require('keyv');
const { getConfig } = require('./config');
const logger = require('./src/logger');

const users = new Keyv(getConfig('storage'), { namespace: 'users' });
users.on('error', logger.error);

const tokens = new Keyv(getConfig('storage'), { namespace: 'github-personal-tokens' });
tokens.on('error', logger.error);

users.clear();
tokens.clear();
module.exports = { users, tokens };
