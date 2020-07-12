import {
  ADD_TOP_RATED,
  ADD_POPULAR,
  ADD_NOW_PLAYING,
  ADD_UPCOMING,
  SET_LOADING,
  GET_USER_MOVIES,
  GET_MOVIES_ERROR,
} from '../actionTypes';

const initialState = {
  isLoading: true,
  popular: {},
  nowPlaying: {},
  topRated: {},
  upcoming: {},
  userMovies: {},
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TOP_RATED: {
      const { content, page, totalPages } = payload;
      return {
        ...state,
        topRated: { ...state.topRated, [page]: content, totalPages },
      };
    }
    case ADD_POPULAR: {
      const { content, page, totalPages } = payload;
      return {
        ...state,
        popular: { ...state.popular, [page]: content, totalPages },
      };
    }
    case ADD_NOW_PLAYING: {
      const { content, page, totalPages } = payload;
      return {
        ...state,
        nowPlaying: { ...state.nowPlaying, [page]: content, totalPages },
      };
    }
    case ADD_UPCOMING: {
      const { content, page, totalPages } = payload;
      return {
        ...state,
        upcoming: { ...state.upcoming, [page]: content, totalPages },
      };
    }
    case SET_LOADING: {
      const { isLoading } = payload;
      return {
        ...state,
        isLoading: isLoading,
      };
    }
    case GET_USER_MOVIES: {
      return {
        ...state,
        userMovies: { ...payload },
      };
    }
    case GET_MOVIES_ERROR: {
      return {
        ...state,
        error: payload,
      };
    }
    default:
      return state;
  }
}
