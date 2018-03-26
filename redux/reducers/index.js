import { combineReducers } from 'redux';
import repoReducer from './repoReducer';
import userReducer from './userReducer';

export default combineReducers({
  repo: repoReducer,
  user: userReducer,
});
