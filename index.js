const express = require('express');
const next = require('next');
const _ = require('lodash');
const git = require('./src/git');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const doPath = req => _.merge(req.params, { path: req.param(0).substr(1) });

  server.get('/repo/:name/:ref*', (req, res) => {
    app.render(req, res, '/repo', doPath(req));
  });

  server.use('/antd', express.static(path.join(__dirname, '/node_modules/antd/dist')));

  server.get('/api/v1/repo/:name/:ref*', (req, res) => {
    const params = doPath(req);
    res.setHeader('Content-Type', 'application/json');
    git.getLocalRepository(params.name)
      .then(repo => git.browse(repo, params.path))
      .then(data => res.send(JSON.stringify(data)))
      .catch(e => console.log(e));
  });

  server.get('*', (req, res) => {
    handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
