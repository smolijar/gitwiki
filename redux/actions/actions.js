import types from './types';

export default {
  repo: {
    setTree: data => ({ type: types.repo.SET_TREE, data }),
    setRepo: data => ({ type: types.repo.SET_REPO, data }),
  },
  hello: {
    world: () => ({ type: types.hello.HELLO_WORLD }),
    name: name => ({ type: types.hello.HELLO_NAME, name }),
    api: {
      fetch: () => ({ type: types.hello.api.HELLO_API_FETCH }),
      done: data => ({ type: types.hello.api.HELLO_API_DONE, data }),
    },
  },
};
