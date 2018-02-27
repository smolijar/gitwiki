const endpoints = {
  TREE: 'TREE',
  REFS: 'REFS',
};

module.exports.endpoints = endpoints;

const routes = {
  [endpoints.TREE]: {
    generate: ({ name, ref, path }) => `/repo/tree/${[name, ref, path].filter(p => p !== '').join('/')}`,
  },
  [endpoints.REFS]: {
    generate: ({ name }) => `/repo/refs/${name}`,
  },
};

module.exports.generate = endpoint => routes[endpoint].generate;
