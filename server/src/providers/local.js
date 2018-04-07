const {
  map, compose, objOf, merge,
} = require('ramda');
const gitolite = require('../gitolite');
const git = require('../git');
const types = require('./types');


const entryFromName = compose(merge({ provider: 'local' }), objOf('name'));

const listRepos = req => gitolite.listRepos(req)
  .then(map(entryFromName));

const getRepository = git.getLocalRepository;

const provider = types.LOCAL;

module.exports = { listRepos, getRepository, provider };
