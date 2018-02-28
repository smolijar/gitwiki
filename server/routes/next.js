const express = require('express');
const { expressPattern, endpoints } = require('../../src/routes');


module.exports = (app) => {
  const router = express.Router();

  router.get(expressPattern(endpoints.TREE), (req, res) => {
    req.params.path = req.params.path || '';
    req.nextjs.render(req, res, '/repo/tree', req.params);
  });

  return router;
};
