const {
  not, filter, identity, split, compose, dropLastWhile,
  all, ifElse, match, join, pipe, both, always, concat,
} = require('ramda');


const procArgs = pipe(
  dropLastWhile(not),
  ifElse(
    all(both(identity, match(/^\s*[a-zA-Z0-9@]+\s*$/))),
    identity,
    always([]),
  ),
  join(' '),
  concat(' '),
);

const commands = {
  LIST_REPOS: 'list-repos',
  LIST_USERS: 'list-users',
  LIST_GROUPS: 'list-groups',
  ACCESS: 'access',
};

const outToList = compose(filter(identity), split('\n'));


module.exports = { procArgs, commands, outToList };
