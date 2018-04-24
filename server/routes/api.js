const express = require('express');
const {
  last, split, trim, compose,
} = require('ramda');
const logger = require('../src/logger');
const git = require('../src/git');
const { api } = require('../../common/endpoints');
const { getRedirectUri, getAccessToken, savePersonalToken } = require('../auth/github');
const providers = require('../src/providers');
const { getUser } = require('../auth/authentication');
const { users } = require('../storage');

const router = express.Router();

const authMdw = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const parseToken = compose(trim, last, split('token'));
    getUser(parseToken(authorization))
      .then((user) => {
        req.user = user;
        next();
      });
  } else {
    next();
  }
};

router.get(api.tree, authMdw, (req, res) => {
  providers.getProvider(req.params.provider)
    .getRepository(req.user, req.params.name)
    .then(repo => git.browse(repo, req.params.path, req.params.ref))
    .then(data => res.json(data))
    .catch(e => logger.error(e));
});

router.put(api.tree, authMdw, (req, res) => {
  const { changes } = req.body;
  providers.getProvider(req.params.provider)
    .getRepository(req.user, req.params.name)
    .then(repo => git.commitAndPush(repo, req.user, changes, 'XXX'))
});

router.get(api.refs, authMdw, (req, res) => {
  providers.getProvider(req.params.provider)
    .getRepository(req.user, req.params.name)
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

router.get(api.user, authMdw, (req, res) => {
  res.json(req.user);
});

router.post(api.authGithubPersonalToken, authMdw, (req, res) => {
  const { personalToken } = req.body;
  if (personalToken) {
    savePersonalToken(req.user, personalToken);
    users.get(req.user.accessToken)
      .then(u => res.json(u));
  }
});

router.get(api.index, authMdw, (req, res) => {
  providers.listRepos(req.user)
    .then(r => res.json(r));
});

module.exports = router;
