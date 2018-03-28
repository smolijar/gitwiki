const {
  map, compose, objOf, merge,
} = require('ramda');
const gitolite = require('../gitolite');

const entryFromName = compose(merge({ provider: 'local' }), objOf('name'));

const listRepos = req => gitolite.listRepos(req)
  .then(map(entryFromName));

module.exports = { listRepos };
