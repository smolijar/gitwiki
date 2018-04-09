const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

module.exports = (server, app) => {
  server.use((req, res, next) => {
    req.nextjs = app;
    next();
  });
  server.use(cookieParser());
  server.use(bodyParser());
};
