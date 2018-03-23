import { combineReducers } from 'redux';
import repoReducer from './repoReducer';
import authReducer from './authReducer';

export default combineReducers({
  repo: repoReducer,
  auth: authReducer,
});
