import { v4 as uuidv4 } from 'uuid';
import {
  ADD_TOP_RATED,
  ADD_POPULAR,
  ADD_NOW_PLAYING,
  ADD_UPCOMING,
  SET_LOADING,
  SET_LAST_PAGE,
  SET_SEARCH_PAGE,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
  SET_ALERT,
  REMOVE_ALERT,
} from './actionTypes';

export const addTopRated = (page, content, totalPages) => ({
  type: ADD_TOP_RATED,
  payload: {
    page,
    content,
    totalPages,
  },
});

export const addPopular = (page, content, totalPages) => ({
  type: ADD_POPULAR,
  payload: {
    page,
    content,
    totalPages,
  },
});

export const addUpcoming = (page, content, totalPages) => ({
  type: ADD_UPCOMING,
  payload: {
    page,
    content,
    totalPages,
  },
});

export const addNowPlaying = (page, content, totalPages) => ({
  type: ADD_NOW_PLAYING,
  payload: {
    page,
    content,
    totalPages,
  },
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: {
    isLoading,
  },
});

export const setLastPage = (lastPage) => ({
  type: SET_LAST_PAGE,
  payload: {
    lastPage,
  },
});

export const setSearchPage = (searchPage) => ({
  type: SET_SEARCH_PAGE,
  payload: {
    searchPage,
  },
});

export const setSearchQuery = (searchQuery) => ({
  type: SET_SEARCH_QUERY,
  payload: {
    searchQuery,
  },
});

export const setSearchResults = (searchResults, page, totalPages) => ({
  type: SET_SEARCH_RESULTS,
  payload: {
    searchResults,
    page,
    totalPages,
  },
});

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
