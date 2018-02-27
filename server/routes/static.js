const express = require('express');
const path = require('path');

module.exports = (server, app) => {
  server.use('/antd', express.static(path.join(__dirname, '../../node_modules/antd/dist')));
  server.use('/nprogress', express.static(path.join(__dirname, '../../node_modules/nprogress')));
  server.use('/file-icons-js', express.static(path.join(__dirname, '../../node_modules/file-icons-js')));
};
