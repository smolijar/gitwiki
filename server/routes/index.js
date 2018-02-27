const express = require('express');
const path = require('path');
const logger = require('../src/logger');
const git = require('../src/git');


module.exports = (server, app) => {
  const handle = app.getRequestHandler();

  server.get('/repo/tree/:name/:ref/:path([\\S\\s]+)?', (req, res) => {
    req.params.path = req.params.path || '';
    app.render(req, res, '/repo/tree', req.params);
  });

  server.use('/antd', express.static(path.join(__dirname, '../../node_modules/antd/dist')));
  server.use('/nprogress', express.static(path.join(__dirname, '../../node_modules/nprogress')));
  server.use('/file-icons-js', express.static(path.join(__dirname, '../../node_modules/file-icons-js')));

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

  server.get('*', (req, res) => {
    handle(req, res);
  });
};
