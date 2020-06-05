import {
  ADD_TOP_RATED,
  ADD_POPULAR,
  ADD_NOW_PLAYING,
  ADD_UPCOMING,
} from './actionTypes';

export const addTopRated = (page, content) => ({
  type: ADD_TOP_RATED,
  payload: {
    page,
    content,
  },
});

export const addPopular = (page, content) => ({
  type: ADD_POPULAR,
  payload: {
    page,
    content,
  },
});

export const addUpcoming = (page, content) => ({
  type: ADD_UPCOMING,
  payload: {
    page,
    content,
  },
});

export const addNowPlaying = (page, content) => ({
  type: ADD_NOW_PLAYING,
  payload: {
    page,
    content,
  },
});
