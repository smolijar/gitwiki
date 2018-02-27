import types from './types';

export default {
  repo: {
    setTree: data => ({ type: types.repo.SET_TREE, data }),
    setRepo: data => ({ type: types.repo.SET_REPO, data }),
    fetchRefs: data => ({ type: types.repo.FETCH_REFS, data }),
    setRefs: data => ({ type: types.repo.SET_REFS, data }),
  },
};
