const express = require('express');
const {
  map, pickAll, compose, assoc, __, unnest,
} = require('ramda');
const logger = require('../src/logger');
const git = require('../src/git');
const { api } = require('../../common/endpoints');
const { getRedirectUri, getAccessToken } = require('../auth/github');
const gitolite = require('../src/gitolite');


const router = express.Router();

router.get(api.tree, (req, res) => {
  git.getLocalRepository(req.params.name)
    .then(repo => git.browse(repo, req.params.path, req.params.ref))
    .then(data => res.json(data))
    .catch(e => logger.error(e));
});

router.get(api.refs, (req, res) => {
  git.getLocalRepository(req.params.name)
    .then(repo => git.refs(repo))
    .then(data => res.json(data))
    .catch(e => logger.error(e));
});

router.get(api.authGithub, (req, res) => {
  res.redirect(getRedirectUri());
});

router.get(api.authGithubCb, (req, res) => {
  const { code } = req.query;
  getAccessToken(code)
    .then(accessToken => req.nextjs.render(req, res, '/auth/github/cb', { accessToken }));
});

router.get(api.user, (req, res) => {
  const { authorization } = req.headers;
  if (authorization) {
    fetch('https://api.github.com/user', { headers: { authorization } })
      .then(x => x.json())
      .then(r => res.json(r));
  }
});

router.get(api.index, (req, res) => {
  const { authorization } = req.headers;
  const pickRepo = pickAll(['name', 'description']);
  const entryFromName = assoc('name', __, {});
  if (authorization) {
    Promise.all([
      gitolite.listRepos()
        .then(map(compose(pickRepo, entryFromName))),
      fetch('https://api.github.com/user/repos', { headers: { authorization } })
        .then(x => x.json())
        .then(map(pickRepo)),
    ])
      .then(unnest)
      .then(r => res.json(r));
  } else {
    res.json({ code: 403 });
  }
});

module.exports = router;
