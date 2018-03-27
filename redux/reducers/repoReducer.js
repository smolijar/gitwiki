import types from '../actions/types';

const initialState = {
  meta: null,
  tree: [],
  blob: null,
  refs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.repo.SET_REPO:
      return { ...state, meta: action.data };
    case types.repo.SET_TREE:
      return { ...state, tree: action.data.tree, blob: action.data.blob };
    case types.repo.SET_REFS:
      return { ...state, refs: action.data };
    case types.repo.SET_LIST:
      return { ...state, list: action.data };
    default:
      return state;
  }
};
