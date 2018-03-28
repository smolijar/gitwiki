const { exec } = require('child_process');
const { procArgs, commands, outToList } = require('./cliHelper');

const { identity, always, concat } = require('ramda');

module.exports = (config) => {
  const baseCommand = `HOME=${config.home}; ${config.bin} `;
  const createCommand = (command, tranform = identity) => () => new Promise((res, rej) => {
    exec(
      baseCommand + command,
      (error, stdout, stderr) => {
        if (error !== null) {
          rej(error, stdout, stderr);
        }
        res(stdout, stderr);
      },
    );
  })
    .then(tranform);


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

  return gitolite;
};
