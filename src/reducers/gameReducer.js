import { defaultGameState } from '@data/freecellState';
import * as actionType from '@actions/actionTypes';

export const gameReducer = (state = defaultGameState, action) => {
  // 初始化
  if (action.type === actionType.INIT_GAME) {
    return defaultGameState;
  }

  // 更新遊戲
  if (action.type === actionType.UPDATE_GAME) {
    // 取得新的遊戲狀態
    const { newGameState } = action.payload;

    return newGameState;
  }

  return state;
};
