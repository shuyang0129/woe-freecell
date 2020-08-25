import * as actionType from '@actions/actionTypes';

import { defaultGameState, defaultState } from '@data/freecellState';

import _ from 'lodash';
import { newGame } from '@utils/freecell';
import { randomNum } from '@utils';

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

  // 移動至FreeCells
  if (action.type === actionType.MOVE_TO_FREECELLS) {
    const {
      targetId, // 目的地位置id
      sourceId, // 來源位置id
      cardId, //卡片id
    } = action.payload;

    const gameStateClone = _.cloneDeep(state);

    for (const cellsType in gameStateClone) {
      const cellsArea = gameStateClone[cellsType];
      const isCardLastItem = cellsArea[sourceId].lastIndexOf(cardId) === 0;
      const isCellEmpty = gameStateClone.freecells.length === 0;

      if (sourceId in cellsArea && isCardLastItem && isCellEmpty) {
        cellsArea[sourceId].pop();
        gameStateClone.freecells[targetId].push(cardId);
        break;
      }
    }

    return gameStateClone;
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

const generateNewGame = code => {
  // 依據game code，產生新牌局
  const game = newGame(code);

  // 複製gameState，避免直接修改state
  const gameStateClone = _.cloneDeep(defaultState);

  // 更新game code到state中
  gameStateClone.gameCode = code;
  gameStateClone.isGameStarted = true;

  // 將game放到gameState中，對的位置
  game.forEach((card, index) => {
    const NUM_OF_TABLEAU_COLUMN = Object.keys(gameStateClone.tableau).length;
    const columnIndex = index % NUM_OF_TABLEAU_COLUMN;

    gameStateClone.tableau[`tableauColumn-${columnIndex}`].push(card);
  });

  return gameStateClone;
};
