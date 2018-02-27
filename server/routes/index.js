const staticRoutes = require('./static');
const nextRoutes = require('./next');
const apiRoutes = require('./api');

module.exports = (server, app) => {
  const handle = app.getRequestHandler();

  nextRoutes(server, app);
  staticRoutes(server);
  apiRoutes(server);

  server.get('*', (req, res) => {
    handle(req, res);
  });
};
