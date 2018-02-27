const staticRouter = require('./static');
const getNextRouter = require('./next');
const apiRouter = require('./api');

module.exports = (server, app) => {
  const handle = app.getRequestHandler();

  server.use(getNextRouter(app));
  server.use('/static', staticRouter);
  server.use('/api/v1', apiRouter);

  server.get('*', (req, res) => {
    handle(req, res);
  });
};
