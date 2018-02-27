module.exports.endpoints = {
  TREE: 'TREE',
  REFS: 'REFS',
};

module.exports.generate = (endpoint) => {
  switch (endpoint) {
    case module.exports.endpoints.TREE:
      return ({ name, ref, path }) => `/repo/tree/${[name, ref, path].filter(p => p !== '').join('/')}`;
    case module.exports.endpoints.REFS:
      return ({ name }) => `/repo/refs/${name}`;
    default:
      throw new Error(`Unknown endpoint ${endpoint}`);
  }
};

