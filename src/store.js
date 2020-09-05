import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '@/reducers';
import reduxThunk from 'redux-thunk';
import { updateIsGameStarted } from '@actions/playAction';
import { SOLITAIRE } from '@constants/sessionStorage';

const isDev = process.env.NODE_ENV === 'development';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(reduxThunk),
    isDev && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

store.subscribe(() => {
  const gameState = store.getState();
  sessionStorage.setItem(SOLITAIRE, JSON.stringify(gameState));
  // 如果步數大於0，遊戲開始
  if (gameState.play.moves > 0 && !gameState.play.isGameStarted) {
    store.dispatch(updateIsGameStarted(true));
  }

  console.log(store.getState());
});

export default store;
