const express = require('express');
const staticRouter = require('./static');
const getNextRouter = require('./next');
const apiRouter = require('./api');

module.exports = (app) => {
  const router = express.Router();
  const handle = app.getRequestHandler();

  router.use(getNextRouter(app));
  router.use('/static', staticRouter);
  router.use('/api/v1', apiRouter);

  router.get('*', (req, res) => {
    handle(req, res);
  });
  return router;
};
