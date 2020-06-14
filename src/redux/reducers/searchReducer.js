import { SET_SEARCH_QUERY, SET_SEARCH_RESULTS } from '../actionTypes';

const initialState = {
  searchQuery: '',
  searchResults: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_QUERY: {
      const { searchQuery } = action.payload;
      return {
        ...state,
        searchQuery: searchQuery,
      };
    }
    case SET_SEARCH_RESULTS: {
      const { searchResults, page, totalPages } = action.payload;
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          [page]: searchResults,
          totalPages,
        },
      };
    }
    default:
      return state;
  }
}
