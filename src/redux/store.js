import { createStore } from 'redux';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const devTools =
  process.env.NODE_ENV === 'production' ? undefined : composeWithDevTools();

export default createStore(rootReducer, devTools);
