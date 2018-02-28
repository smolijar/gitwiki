module.exports = (server, app) => {
  server.use((req, res, next) => {
    req.nextjs = app;
    next();
  });
};
