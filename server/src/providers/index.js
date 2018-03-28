const github = require('./github');
const local = require('./local');
const { map, pickAll, unnest } = require('ramda');

const providers = [github, local];
const pickRepo = pickAll(['name', 'description', 'provider']);

const listRepos = req => Promise.all(providers.map(p => p.listRepos(req)))
  .then(unnest)
  .then(map(pickRepo));


module.exports = { listRepos };
