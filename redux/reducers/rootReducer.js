import { combineReducers } from 'redux';
import types from '../actions/types';

const initialRepoState = {};

export default combineReducers({
  repo: (state = initialRepoState, action) => {
    switch (action.type) {
      case types.repo.SET_REPO:
        return { ...state, meta: action.data };
      case types.repo.SET_TREE:
        return { ...state, tree: action.data.tree, blob: action.data.blob };
      default:
        return state;
    }
  },
});
