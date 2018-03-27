import types from './types';

export default {
  repo: {
    setTree: data => ({ type: types.repo.SET_TREE, data }),
    setRepo: data => ({ type: types.repo.SET_REPO, data }),
    fetchRefs: data => ({ type: types.repo.FETCH_REFS, data }),
    setRefs: data => ({ type: types.repo.SET_REFS, data }),
    fetchList: data => ({ type: types.repo.FETCH_LIST, data }),
    setList: data => ({ type: types.repo.SET_LIST, data }),
  },
  user: {
    fetchUser: data => ({ type: types.user.FETCH_USER, data }),
    setUser: data => ({ type: types.user.SET_USER, data }),
  },
};
