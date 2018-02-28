const express = require('express');
const logger = require('../src/logger');
const git = require('../src/git');
const { expressPattern, endpoints } = require('../../src/routes');

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

module.exports = router;
