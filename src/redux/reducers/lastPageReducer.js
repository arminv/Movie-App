import { SET_LAST_PAGE } from '../actionTypes';

const initialState = {
  lastPage: 'POPULAR',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LAST_PAGE: {
      const { lastPage } = action.payload;
      return {
        lastPage: lastPage,
      };
    }
    default:
      return state;
  }
}
