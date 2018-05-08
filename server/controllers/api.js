const { api } = require('../../common/endpoints');
const { getRedirectUri, getAccessToken, savePersonalToken } = require('../auth/github');
const providers = require('../src/providers');
const { users } = require('../storage');
const logger = require('../src/logger');
const git = require('../src/git');

const controller = {
  get: {},
  post: {},
  put: {},
  patch: {},
};

controller.get[api.tree] = (req, res) => {
  providers.getProvider(req.params.provider)
    .getRepository(req.user, req.params.name)
    .then(repo => git.browse(repo, req.params.path, req.params.ref))
    .then(data => res.json(data))
    .catch(e => logger.error(e));
};

controller.put[api.tree] = (req) => {
  const { changes, message } = req.body;
  providers.getProvider(req.params.provider)
    .getRepository(req.user, req.params.name)
    .then(repo => git.commitAndPush(repo, req.user, changes, message))
    .catch(e => logger.error(e));
};

controller.get[api.refs] = (req, res) => {
  providers.getProvider(req.params.provider)
    .getRepository(req.user, req.params.name)
    .then(repo => git.refs(repo))
    .then(data => res.json(data))
    .catch(e => logger.error(e));
};

controller.get[api.authGithub] = (req, res) => {
  res.redirect(getRedirectUri());
};

controller.get[api.authGithubCb] = (req, res) => {
  const { code } = req.query;
  getAccessToken(code)
    .then(accessToken => req.nextjs.render(req, res, '/auth/github/cb', { accessToken }));
};

controller.get[api.user] = (req, res) => {
  res.json(req.user);
};

controller.post[api.authGithubPersonalToken] = (req, res) => {
  const { personalToken } = req.body;
  if (personalToken) {
    savePersonalToken(req.user, personalToken);
    users.get(req.user.accessToken)
      .then(u => res.json(u));
  }
};

controller.get[api.index] = (req, res) => {
  providers.listRepos(req.user)
    .then(r => res.json(r));
};

module.exports = controller;
