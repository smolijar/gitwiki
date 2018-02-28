const express = require('express');
const next = require('next');
const logger = require('./src/logger');
const rootRouter = require('./routes');
const bootstrap = require('./bootstrap');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
  const server = express();

  bootstrap(server, app);
  server.use(rootRouter);

  server.listen(3000, (err) => {
    if (err) throw err;
    logger.info('> Ready on http://localhost:3000');
  });
});
