import { combineReducers } from 'redux';
import types from '../actions/types';

const initialRepoState = {};

export default combineReducers({
  hello: (state = ':-(', action) => {
    switch (action.type) {
      case types.hello.HELLO_WORLD:
        return 'Hello world!';
      case types.hello.HELLO_NAME:
        return `Hello ${action.name}!`;
      default:
        return state;
    }
  },
  sagaHello: (state = {}, action) => {
    switch (action.type) {
      case types.hello.api.HELLO_API_DONE:
        return action.data;
      default:
        return state;
    }
  },
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
