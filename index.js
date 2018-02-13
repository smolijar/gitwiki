const git = require('./src/git');

git.getLocalRepository('gitolite-admin')
  .then(repo => console.log(repo.workdir()))
  .catch(err => console.log(err))
