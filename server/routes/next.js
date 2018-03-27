const express = require('express');
const { front } = require('../../common/endpoints');

const router = express.Router();

router.get(front.tree, (req, res) => {
  req.params.path = req.params.path || '';
  req.nextjs.render(req, res, '/repo/tree', req.params);
});

router.get(front.list, (req, res) => {
  req.params.path = req.params.path || '';
  req.nextjs.render(req, res, '/repo/list', req.params);
});

module.exports = router;

