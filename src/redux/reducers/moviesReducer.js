import { ADD_TOP_RATED } from '../actionTypes';

const initialState = {
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
    default:
      return state;
  }
}
