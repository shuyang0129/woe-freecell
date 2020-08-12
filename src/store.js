import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '@/reducers';
import reduxThunk from 'redux-thunk';

const isDev = process.env.NODE_ENV === 'development';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(reduxThunk),
    isDev &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

if (isDev) store.subscribe(() => console.log(store.getState()));

export default store;
