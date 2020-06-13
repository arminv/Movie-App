import { SET_SEARCH_QUERY, SET_SEARCH_RESULTS } from '../actionTypes';

const initialState = {
  searchQuery: '',
  searchResults: [],
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
      const { searchResults } = action.payload;
      return {
        ...state,
        searchResults: searchResults,
      };
    }
    default:
      return state;
  }
}
