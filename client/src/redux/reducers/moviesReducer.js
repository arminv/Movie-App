import {
  ADD_TOP_RATED,
  ADD_POPULAR,
  ADD_NOW_PLAYING,
  ADD_UPCOMING,
  SET_LOADING,
} from '../actionTypes';

const initialState = {
  isLoading: true,
  popular: {},
  nowPlaying: {},
  topRated: {},
  upcoming: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TOP_RATED: {
      const { content, page, totalPages } = action.payload;
      return {
        ...state,
        topRated: { ...state.topRated, [page]: content, totalPages },
      };
    }
    case ADD_POPULAR: {
      const { content, page, totalPages } = action.payload;
      return {
        ...state,
        popular: { ...state.popular, [page]: content, totalPages },
      };
    }
    case ADD_NOW_PLAYING: {
      const { content, page, totalPages } = action.payload;
      return {
        ...state,
        nowPlaying: { ...state.nowPlaying, [page]: content, totalPages },
      };
    }
    case ADD_UPCOMING: {
      const { content, page, totalPages } = action.payload;
      return {
        ...state,
        upcoming: { ...state.upcoming, [page]: content, totalPages },
      };
    }
    case SET_LOADING: {
      const { isLoading } = action.payload;
      return {
        ...state,
        isLoading: isLoading,
      };
    }
    default:
      return state;
  }
}
