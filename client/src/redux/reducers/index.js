import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import lastPageReducer from './lastPageReducer';
import searchReducer from './searchReducer';
import alertReducer from './alertReducer';
import authReducer from './authReducer';

export default combineReducers({
  moviesReducer,
  lastPageReducer,
  searchReducer,
  alertReducer,
  authReducer,
});
