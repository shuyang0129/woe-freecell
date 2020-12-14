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
    // isDev && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    // window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

store.subscribe(() => {
  const state = store.getState();
  isDev && console.log('state', state);

  // 遊戲開始後，開始紀錄遊戲狀態在sessionStorage中
  if (state.play.isGameStarted) sessionStorage.setItem(SOLITAIRE, JSON.stringify(state));

  // 如果步數大於0，遊戲開始
  if (state.play.moves > 0 && !state.play.isGameStarted) {
    store.dispatch(updateIsGameStarted(true));
  }

  // 如果遊戲還沒開始或贏了，清除sessionStorage
  if (state.play.isGameWin || !state.play.isGameStarted) sessionStorage.clear();

  // 檢查遊戲是否贏了
  if (!state.play.isGameWin && checkIsGameWin(state.game)) {
    store.dispatch(updateIsGameWin(true));
  }
});

export default store;
