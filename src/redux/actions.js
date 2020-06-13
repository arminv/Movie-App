import {
  ADD_TOP_RATED,
  ADD_POPULAR,
  ADD_NOW_PLAYING,
  ADD_UPCOMING,
  SET_LOADING,
  SET_LAST_PAGE,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
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

export const setSearchQuery = (searchQuery) => ({
  type: SET_SEARCH_QUERY,
  payload: {
    searchQuery,
  },
});

export const setSearchResults = (searchResults) => ({
  type: SET_SEARCH_RESULTS,
  payload: {
    searchResults,
  },
});
