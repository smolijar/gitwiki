import types from '../actions/types';

const initialState = {
  meta: null,
  tree: [],
  blob: null,
  refs: [],
  index: [],
  revision: {
    changes: {},
    message: 'Default message',
  },
};

export default (state = initialState, action) => {
  const { revision } = state;
  switch (action.type) {
    case types.repo.SET_REPO:
      return { ...state, meta: action.data };
    case types.repo.SET_TREE:
      return { ...state, tree: action.data.tree, blob: action.data.blob };
    case types.repo.SET_REFS:
      return { ...state, refs: action.data };
    case types.repo.SET_INDEX:
      return { ...state, index: action.data };
    case types.revision.SET_MESSAGE:
      revision.message = action.data;
      return { ...state, revision };
    case types.revision.SET_CHANGE:
      revision.changes[action.data.path] = action.data;
      return { ...state, revision };
    default:
      return state;
  }
};
