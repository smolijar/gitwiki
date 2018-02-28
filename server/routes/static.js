const express = require('express');
const path = require('path');

const router = express.Router();
const moduleStatic = module => express.static(path.join(__dirname, `../../node_modules${module}`));

router.use('/antd', moduleStatic('/antd/dist'));
router.use('/nprogress', moduleStatic('/nprogress'));
router.use('/file-icons-js', moduleStatic('/file-icons-js'));

module.exports = router;
