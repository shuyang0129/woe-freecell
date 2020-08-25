import * as actionType from '@actions/actionTypes';

import { defaultGameState, defaultState } from '@data/freecellState';

import _ from 'lodash';
import { newGame } from '@utils/freecell';
import { randomNum } from '@utils';

export const gameReducer = (state = defaultGameState, action) => {
  // 初始化
  if (action.type === actionType.INIT) {
    return defaultGameState;
  }

  // 開始新遊戲
  if (action.type === actionType.NEW_GAME) {
    let code;

    // 取得game code
    if (action.payload && 'gameCode' in action.payload) {
      code = action.payload.gameCode;
    } else {
      code = randomNum(1000000);
    }

    // 依據game code，產生新牌局
    const game = newGame(code);

    // 複製gameState，避免直接修改state
    const gameStateClone = _.cloneDeep(defaultGameState);

    // 將game放到gameState中，對的位置
    game.forEach((card, index) => {
      const NUM_OF_TABLEAU_COLUMN = Object.keys(gameStateClone.tableau).length;
      const columnIndex = index % NUM_OF_TABLEAU_COLUMN;

      gameStateClone.tableau[`tableauColumn-${columnIndex}`].push(card);
    });

    return gameStateClone;
  }

  return state;
};
