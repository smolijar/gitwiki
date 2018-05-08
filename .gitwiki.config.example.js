module.exports = {
  auth: {
    oauth2: {
      github: {
        client_id: 'CLIENT_ID',
        client_secret: 'CLIENT_SECRET',
      }
    }
  },
  gitolite: {
    bin: '/home/git/bin/gitolite',
    home: '/home/git',
    user: 'git',
  },
  storage: 'sqlite:///home/git/database.sqlite',
};