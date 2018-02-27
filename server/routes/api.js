const logger = require('../src/logger');
const git = require('../src/git');

module.exports = (server, app) => {
  server.get('/api/v1/repo/tree/:name/:ref/:path([\\S\\s]+)?', (req, res) => {
    req.params.path = req.params.path || '';
    git.getLocalRepository(req.params.name)
      .then(repo => git.browse(repo, req.params.path, req.params.ref))
      .then(data => res.json(data))
      .catch(e => logger.error(e));
  });

  server.get('/api/v1/repo/refs/:name', (req, res) => {
    git.getLocalRepository(req.params.name)
      .then(repo => git.refs(repo))
      .then(data => res.json(data))
      .catch(e => logger.error(e));
  });
};
