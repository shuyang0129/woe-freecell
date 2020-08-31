import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '@/reducers';
import reduxThunk from 'redux-thunk';
import { updateIsGameStarted } from './actions/playAction';

const isDev = process.env.NODE_ENV === 'development';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(reduxThunk),
    isDev && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

store.subscribe(() => {
  const { play } = store.getState();
  // 如果步數大於0，遊戲開始
  if (play.moves > 0 && !play.isGameStarted) store.dispatch(updateIsGameStarted(true));

  console.log(store.getState());
});

export default store;
