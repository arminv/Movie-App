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
      const { content, page } = action.payload;
      return {
        ...state,
        topRated: { ...state.topRated, [page]: content },
      };
    }
    case ADD_POPULAR: {
      const { content, page } = action.payload;
      return {
        ...state,
        popular: { ...state.popular, [page]: content },
      };
    }
    case ADD_NOW_PLAYING: {
      const { content, page } = action.payload;
      return {
        ...state,
        nowPlaying: { ...state.nowPlaying, [page]: content },
      };
    }
    case ADD_UPCOMING: {
      const { content, page } = action.payload;
      return {
        ...state,
        upcoming: { ...state.upcoming, [page]: content },
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
