module.exports.generateBrowsingLink = ({ name, ref, path }, entry = '') => `/repo/${[name, ref, path, entry].filter(p => p !== '').join('/')}`;
