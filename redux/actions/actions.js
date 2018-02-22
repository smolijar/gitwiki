import types from './types';

export default {
  hello: {
    world: () => ({ type: types.hello.HELLO_WORLD }),
    name: name => ({ type: types.hello.HELLO_NAME, name }),
    api: {
      fetch: () => ({ type: types.hello.api.HELLO_API_FETCH }),
      done: data => ({ type: types.hello.api.HELLO_API_DONE, data }),
    },
  },
};
