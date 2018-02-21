module.exports.generateBrowsingLink = ({ name, ref, path }) => `/repo/${[name, ref, path].filter(p => p !== '').join('/')}`;
