const express = require('express');
const staticRouter = require('./static');
const nextRouter = require('./next');
const apiRouter = require('./api');

const router = express.Router();

router.use(nextRouter);
router.use('/static', staticRouter);
router.use(apiRouter);

router.get('*', (req, res) => {
  const handle = req.nextjs.getRequestHandler();
  handle(req, res);
});

module.exports = router;
