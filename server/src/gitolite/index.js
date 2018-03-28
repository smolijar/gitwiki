const { exec } = require('child_process');
const {
  not, filter, identity, split, compose, dropLastWhile,
  all, ifElse, match, join, pipe, both, always, concat,
} = require('ramda');

const bin = '/home/git/bin/gitolite';
const prefix = `HOME=/home/git; ${bin} `;

const createCommand = (command, tranform = identity) => () => new Promise((res, rej) => {
  exec(
    prefix + command,
    (error, stdout, stderr) => {
      if (error !== null) {
        rej(error, stdout, stderr);
      }
      res(stdout, stderr);
    },
  );
})
  .then(tranform);

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

const gitolite = {
  listRepos: createCommand(commands.LIST_REPOS, outToList),
  listUsers: createCommand(commands.LIST_USERS, outToList),
  listGroups: createCommand(commands.LIST_GROUPS, outToList),
  access: (repo, user, perm = null, ref = null) => {
    const command = concat(commands.ACCESS, procArgs([repo, user, perm, ref]));
    return createCommand(command)()
      .then(always(true))
      .catch(err => (err.code === 1 ? false : err));
  },
};

module.exports = gitolite;
