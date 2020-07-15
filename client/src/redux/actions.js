import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

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
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_USER_MOVIES,
  GET_MOVIES_ERROR,
  // ADD_USER_MOVIE,
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

export const setAlert = (msg, alertType, timeout = 4000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

// Load User:
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/auth',
      headers: {
        common: {
          'x-auth-token': localStorage.token,
        },
      },
    });

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User:
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      // payload is the token:
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'error'));
      });
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User:
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      // payload is the token:
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'error'));
      });
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout User:
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

// Get User's Movies:
export const getUserMovies = (userId) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/movies/${userId}`,
      headers: {
        common: {
          'x-auth-token': localStorage.token,
        },
      },
    });

    dispatch({
      type: GET_USER_MOVIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_MOVIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add a Movie to User's cart:
export const addUserMovie = (movieId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.token,
    },
  };

  const body = JSON.stringify({ movies: movieId });

  try {
    const res = await axios.post('/api/movies', body, config);
    return res;
  } catch (err) {
    dispatch({
      type: GET_MOVIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove a Movie from User's cart:
export const removeUserMovie = (movieUId) => async (dispatch) => {
  const config = {
    headers: {
      common: {
        'x-auth-token': localStorage.token,
      },
    },
  };

  try {
    const res = await axios.delete(`/api/movies/${movieUId}`, config);
    return res;
  } catch (err) {
    dispatch({
      type: GET_MOVIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
