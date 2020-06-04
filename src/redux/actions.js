import { ADD_TOP_RATED } from './actionTypes';

export const addTopRated = (page, content) => ({
  type: ADD_TOP_RATED,
  payload: {
    page,
    content,
  },
});
