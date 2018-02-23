import types from '../actions/types';

const initialState = {
  meta: null,
  tree: [],
  blob: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.repo.SET_REPO:
      return { ...state, meta: action.data };
    case types.repo.SET_TREE:
      return { ...state, tree: action.data.tree, blob: action.data.blob };
    default:
      return state;
  }
};
