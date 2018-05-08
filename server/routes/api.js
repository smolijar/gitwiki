const express = require('express');
const {
  last, split, trim, compose,
} = require('ramda');
const { api } = require('../../common/endpoints');
const { getUser } = require('../auth/authentication');
const controller = require('../controllers/api');

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

router.get(api.tree, authMdw, controller.get[api.tree]);

router.put(api.tree, authMdw, controller.put[api.tree]);

router.get(api.refs, authMdw, controller.get[api.refs]);

router.get(api.authGithub, controller.get[api.authGithub]);

router.get(api.authGithubCb, controller.get[api.authGithubCb]);

router.get(api.user, authMdw, controller.get[api.user]);

router.post(api.authGithubPersonalToken, authMdw, controller.post[api.authGithubPersonalToken]);

router.get(api.index, authMdw, controller.get[api.index]);

module.exports = router;
