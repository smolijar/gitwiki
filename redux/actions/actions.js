import types from './types';

export default {
  repo: {
    setTree: data => ({ type: types.repo.SET_TREE, data }),
    setRepo: data => ({ type: types.repo.SET_REPO, data }),
  },
};
