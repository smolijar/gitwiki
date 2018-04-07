const github = require('./github');
const local = require('./local');
const {
  map, pickAll, unnest, filter, propEq, head, compose,
} = require('ramda');

const providers = [github, local];
const pickRepo = pickAll(['name', 'description', 'provider']);

const listRepos = req => Promise.all(providers.map(p => p.listRepos(req)))
  .then(unnest)
  .then(map(pickRepo));


const getProvider = name => compose(head, filter(propEq('provider', name)))(providers);

module.exports = { listRepos, getProvider };
