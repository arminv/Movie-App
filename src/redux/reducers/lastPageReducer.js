import { SET_LAST_PAGE, SET_SEARCH_PAGE } from '../actionTypes';

const initialState = {
  lastPage: 'POPULAR',
  searchPage: 1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LAST_PAGE: {
      const { lastPage } = action.payload;
      return {
        ...state,
        lastPage: lastPage,
      };
    }
    case SET_SEARCH_PAGE: {
      const { searchPage } = action.payload;
      return {
        ...state,
        searchPage: searchPage,
      };
    }
    default:
      return state;
  }
}
