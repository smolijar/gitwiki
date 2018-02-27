const express = require('express');
const logger = require('../src/logger');
const git = require('../src/git');

const router = express.Router();

router.get('/repo/tree/:name/:ref/:path([\\S\\s]+)?', (req, res) => {
  req.params.path = req.params.path || '';
  git.getLocalRepository(req.params.name)
    .then(repo => git.browse(repo, req.params.path, req.params.ref))
    .then(data => res.json(data))
    .catch(e => logger.error(e));
});

router.get('/repo/refs/:name', (req, res) => {
  git.getLocalRepository(req.params.name)
    .then(repo => git.refs(repo))
    .then(data => res.json(data))
    .catch(e => logger.error(e));
});

module.exports = router;
