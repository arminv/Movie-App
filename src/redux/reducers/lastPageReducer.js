import { SET_LAST_PAGE } from '../actionTypes';

const initialState = {
  lastPage: 'popular',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LAST_PAGE: {
      return {
        lastPage: action.lastPage,
      };
    }

    default:
      return state;
  }
}
