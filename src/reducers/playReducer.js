import _ from 'lodash';
import { defaultPlayState } from '@data/freecellState';
import * as actionType from '@actions/actionTypes';

/**
 * @name playReducer
 * @description 關於「玩」遊戲的相關資訊，比方說歷史紀錄、遊戲是否開始了...等
 */
export const playReducer = (state = defaultPlayState, action) => {
  // 初始化遊玩資訊
  if (action.type === actionType.INIT_PLAY) {
    return defaultPlayState;
  }

  if (action.type === actionType.UPDATE_PLAY) {
    const { newPlayState } = action.payload;
    return newPlayState;
  }

  // 更新Game Code
  if (action.type === actionType.UPDATE_GAMECODE) {
    const { gameCode } = action.payload;
    return { ...state, gameCode };
  }

  // 更新遊戲是否贏了
  if (action.type === actionType.UPDATE_IS_GAME_WIN) {
    const { isGameWin } = action.payload;
    return { ...state, isGameWin };
  }

  // 增加步數
  if (action.type === actionType.INCREASE_MOVES) {
    return { ...state, moves: state.moves + 1 };
  }

  // 更新遊戲是否開始
  if (action.type === actionType.UPDATE_IS_GAME_STARTED) {
    const { isGameStarted } = action.payload;
    return { ...state, isGameStarted };
  }

  // 重設歷史紀錄
  if (action.type === actionType.RESET_HISTORY_MOVES) {
    return { ...state, historyMoves: [] };
  }

  // 新增歷史紀錄
  if (action.type === actionType.ADD_HISTORY_MOVES) {
    // 取得新的Game State
    const { newGameState } = action.payload;
    // 複製目前Game State
    const historyMoves = _.cloneDeep(state.historyMoves);

    // 新增新Game State到目前Game State中
    historyMoves.push(newGameState);

    return { ...state, historyMoves };
  }

  // 重設歷史紀錄
  if (action.type === actionType.POP_HISTORY_MOVES) {
    const historyMoves = _.cloneDeep(state.historyMoves);
    historyMoves.pop();

    return { ...state, historyMoves };
  }

  // 更新拖曳中牌組
  if (action.type === actionType.UPDATE_DRAGGING_CARDS) {
    const { draggingCards } = action.payload;
    return { ...state, draggingCards };
  }
  // 重設拖曳中牌組
  if (action.type === actionType.RESET_DRAGGING_CARDS) {
    return { ...state, draggingCards: [] };
  }

  // 重設拖曳中牌組
  if (action.type === actionType.UPDATE_POSSIBLE_MOVE) {
    const { possibleMove } = action.payload;
    return { ...state, possibleMove };
  }

  // 更新isHintVisble狀態
  if (action.type === actionType.UPDATE_IS_HINT_VISIBLE) {
    const { isHintVisible } = action.payload;
    return { ...state, isHintVisible };
  }

  return state;
};
