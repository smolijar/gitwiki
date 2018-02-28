const express = require('express');
const staticRouter = require('./static');
const getNextRouter = require('./next');
const apiRouter = require('./api');

module.exports = (app) => {
  const router = express.Router();

  router.use(getNextRouter(app));
  router.use('/static', staticRouter);
  router.use('/api/v1', apiRouter);

  router.get('*', (req, res) => {
    const handle = req.nextjs.getRequestHandler();
    handle(req, res);
  });
  return router;
};
