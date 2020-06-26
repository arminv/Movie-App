import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import lastPageReducer from './lastPageReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  moviesReducer,
  lastPageReducer,
  searchReducer,
});
