import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];

const devTools =
  // process.env.NODE_ENV === 'production'
  //   ? applyMiddleware(...middleware)
  //   : composeWithDevTools(applyMiddleware(...middleware));
  composeWithDevTools(applyMiddleware(...middleware));

export default createStore(rootReducer, devTools);
