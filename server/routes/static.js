const express = require('express');
const path = require('path');

const router = express.Router();

router.use('/antd', express.static(path.join(__dirname, '../../node_modules/antd/dist')));
router.use('/nprogress', express.static(path.join(__dirname, '../../node_modules/nprogress')));
router.use('/file-icons-js', express.static(path.join(__dirname, '../../node_modules/file-icons-js')));

module.exports = router;
