const express = require('express');
const logger = require('../src/logger');
const git = require('../src/git');
const { expressPattern, endpoints } = require('../../src/routes');
const { getRedirectUri, getAccessToken } = require('../auth/oidc/github');

const router = express.Router();

router.get(expressPattern(endpoints.TREE), (req, res) => {
  req.params.path = req.params.path || '';
  git.getLocalRepository(req.params.name)
    .then(repo => git.browse(repo, req.params.path, req.params.ref))
    .then(data => res.json(data))
    .catch(e => logger.error(e));
});

router.get(expressPattern(endpoints.REFS), (req, res) => {
  git.getLocalRepository(req.params.name)
    .then(repo => git.refs(repo))
    .then(data => res.json(data))
    .catch(e => logger.error(e));
});

router.get(expressPattern(endpoints.AUTH_GITHUB), (req, res) => {
  res.redirect(getRedirectUri());
});

router.get(expressPattern(endpoints.AUTH_GITHUB_CB), (req, res) => {
  const { code } = req.query;
  getAccessToken(code)
    .then(accessToken => req.nextjs.render(req, res, '/auth/github/cb', { accessToken }));
});

router.get(expressPattern(endpoints.USER), (req, res) => {
  const { authorization } = req.headers;
  if (authorization) {
    fetch('https://api.github.com/user', { headers: { authorization } })
      .then(x => x.json())
      .then(r => res.json(r));
  }
});

module.exports = router;
