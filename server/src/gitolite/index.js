const initGitolite = require('./gitolite');
const { getConfig } = require('../../config');

module.exports = initGitolite(getConfig('gitolite'));
