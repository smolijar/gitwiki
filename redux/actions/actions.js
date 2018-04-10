import types from './types';

export default {
  repo: {
    setTree: data => ({ type: types.repo.SET_TREE, data }),
    setRepo: data => ({ type: types.repo.SET_REPO, data }),
    fetchRefs: data => ({ type: types.repo.FETCH_REFS, data }),
    setRefs: data => ({ type: types.repo.SET_REFS, data }),
    fetchIndex: data => ({ type: types.repo.FETCH_INDEX, data }),
    setIndex: data => ({ type: types.repo.SET_INDEX, data }),
  },
  user: {
    fetchUser: data => ({ type: types.user.FETCH_USER, data }),
    setUser: data => ({ type: types.user.SET_USER, data }),
    postGithubPersonalToken: data => ({ type: types.user.POST_GITHUB_PERSONAL_TOKEN, data }),
  },
};
