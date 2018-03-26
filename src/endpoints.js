const pathToRegexp = require('path-to-regexp');

const endpoints = {
  api: {
    tree: '/api/v1/repo/:name/tree/:ref/:path([\\S\\s]*)?',
    refs: '/api/v1/repo/:name/refs',
    user: '/api/v1/user',
    authGithub: '/api/v1/auth/github',
    authGithubCb: '/api/v1/auth/github/cb',
  },
  front: {
    tree: '/repo/:name/tree/:ref/:path([\\S\\s]*)?',
  },
  construct: pathToRegexp.compile,
};

module.exports = endpoints;
