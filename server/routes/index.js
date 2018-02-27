const staticRoutes = require('./static');
const nextRoutes = require('./next');
const apiRoutes = require('./api');

module.exports = (server, app) => {
  const handle = app.getRequestHandler();

  staticRoutes(server, app);
  nextRoutes(server, app);
  apiRoutes(server, app);

  server.get('*', (req, res) => {
    handle(req, res);
  });
};
