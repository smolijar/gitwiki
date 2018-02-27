const express = require('express');


module.exports = (app) => {
  const router = express.Router();

  router.get('/repo/tree/:name/:ref/:path([\\S\\s]+)?', (req, res) => {
    req.params.path = req.params.path || '';
    app.render(req, res, '/repo/tree', req.params);
  });

  return router;
};
