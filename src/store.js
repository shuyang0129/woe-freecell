import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '@/reducers';
import reduxThunk from 'redux-thunk';
import { updateIsGameStarted } from '@actions/playAction';
import { SOLITAIRE } from '@constants/sessionStorage';
import { checkIsGameWin } from './utils/freecell';
import { updateIsGameWin } from './actions/playAction';

const isDev = process.env.NODE_ENV === 'development';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(reduxThunk),
    isDev && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

store.subscribe(() => {
  const state = store.getState();
  console.log('state', state);

  sessionStorage.setItem(SOLITAIRE, JSON.stringify(state));

  // 如果步數大於0，遊戲開始
  if (state.play.moves > 0 && !state.play.isGameStarted) {
    store.dispatch(updateIsGameStarted(true));
  }

  // 如果遊戲贏了清除sessionStorage，這樣重整就不會停留在最後贏的狀態
  if (state.play.isGameWin) sessionStorage.clear();

  // 檢查遊戲是否贏了
  if (!state.play.isGameWin && checkIsGameWin(state.game)) {
    store.dispatch(updateIsGameWin(true));
  }
});

export default store;
