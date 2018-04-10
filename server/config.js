const config = require('../.gitwiki.config');
const {
  split, compose, path, __,
} = require('ramda');


module.exports.getConfig = compose(path(__, config), split('.'));
