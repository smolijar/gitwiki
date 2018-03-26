import { combineReducers } from 'redux';
import repoReducer from './repoReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

export default combineReducers({
  repo: repoReducer,
  auth: authReducer,
  user: userReducer,
});
