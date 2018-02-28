const endpoints = {
  TREE: 'TREE',
  REFS: 'REFS',
};

module.exports.endpoints = endpoints;

const routes = {
  [endpoints.TREE]: {
    generate: ({ name, ref, path }) => `/repo/tree/${[name, ref, path].filter(p => p !== '').join('/')}`,
    express: '/repo/tree/:name/:ref/:path([\\S\\s]+)?',
  },
  [endpoints.REFS]: {
    generate: ({ name }) => `/repo/refs/${name}`,
    express: '/repo/refs/:name',
  },
};

module.exports.generate = endpoint => routes[endpoint].generate;
module.exports.expressPattern = endpoint => routes[endpoint].express;
