import types from '../actions/types';

const initialState = {
  meta: null,
  tree: [],
  blob: null,
  refs: [],
  index: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.repo.SET_REPO:
      return { ...state, meta: action.data };
    case types.repo.SET_TREE:
      return { ...state, tree: action.data.tree, blob: action.data.blob };
    case types.repo.SET_REFS:
      return { ...state, refs: action.data };
    case types.repo.SET_INDEX:
      return { ...state, index: action.data };
    default:
      return state;
  }
};
