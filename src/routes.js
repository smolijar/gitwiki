const endpoints = {
  TREE: 'TREE',
  REFS: 'REFS',
  AUTH_GITHUB: 'AUTH_GITHUB',
  AUTH_GITHUB_CB: 'AUTH_GITHUB_CB',
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
  [endpoints.AUTH_GITHUB]: {
    generate: () => '/auth/github',
    express: '/auth/github',
  },
  [endpoints.AUTH_GITHUB_CB]: {
    generate: () => '/auth/github/cb',
    express: '/auth/github/cb',
  },
};

module.exports.generate = endpoint => routes[endpoint].generate;
module.exports.expressPattern = endpoint => routes[endpoint].express;
