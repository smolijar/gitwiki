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
  revision: {
    setChange: data => ({ type: types.revision.SET_CHANGE, data }),
    setMessage: data => ({ type: types.revision.SET_MESSAGE, data }),
    postRevision: data => ({ type: types.revision.POST_REVISION, data }),
    clear: data => ({ type: types.revision.CLEAR, data }),
  },
  user: {
    fetchUser: data => ({ type: types.user.FETCH_USER, data }),
    setUser: data => ({ type: types.user.SET_USER, data }),
    postGithubPersonalToken: data => ({ type: types.user.POST_GITHUB_PERSONAL_TOKEN, data }),
  },
};
