const express = require('express');
const {
  last, split, trim, compose,
} = require('ramda');
const { api } = require('../../common/endpoints');
const { getUser } = require('../auth/authentication');
const controller = require('../controllers/api');
const logger = require('../src/logger');

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

const wrapper = controllerAction => (req, res) => controllerAction(req, res);

router.get(api.tree, authMdw, wrapper(controller.get[api.tree]));

router.put(api.tree, authMdw, wrapper(controller.put[api.tree]));

router.get(api.refs, authMdw, wrapper(controller.get[api.refs]));

router.get(api.authGithub, wrapper(controller.get[api.authGithub]));

router.get(api.authGithubCb, wrapper(controller.get[api.authGithubCb]));

router.get(api.user, authMdw, wrapper(controller.get[api.user]));

router.post(api.authGithubPersonalToken, authMdw, wrapper(controller.post[api.authGithubPersonalToken]));

router.get(api.index, authMdw, wrapper(controller.get[api.index]));

module.exports = router;
