import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import lastPageReducer from './lastPageReducer';

export default combineReducers({ moviesReducer, lastPageReducer });
