import _ from 'lodash';
import { generateNewGame } from '@utils/freecell';
import { randomNum } from '@utils';

import {
  initPlay,
  increaseMoves,
  updateGameCode,
  addHistoryMoves,
  popHistoryMoves,
} from './playAction';
import { INIT_GAME, UPDATE_GAME } from './actionTypes';

export const initGame = () => ({
  type: INIT_GAME,
});

/**
 * @name startNewGame
 * @param {Number} gameCode 牌局局號
 * @description 開始新牌局
 */
export const startNewGame = gameCode => (dispatch, getState) => {
  // 1) 初始化State
  dispatch(initPlay());
  dispatch(initGame());

  // 2) 取得game code或隨機產生
  const code = gameCode === undefined ? randomNum(1000000) : gameCode;
  // 2-1) 更新State => 紀錄Game Code
  dispatch(updateGameCode(code));

  // 3) 產生牌局
  const game = generateNewGame(code);

  // 4) 複製目前state
  const { game: gameState } = getState();
  const newGameState = _.cloneDeep(gameState);

  // 5) 將newGame function得到的牌局排進state中
  game.forEach((card, index) => {
    const tableauColumnNum = Object.keys(newGameState.tableau).length || 8;
    const columnIndex = index % tableauColumnNum;

    newGameState.tableau[`tableauColumn-${columnIndex}`].push(card);
  });

  // 6) 更新牌局
  dispatch(updateGameState(newGameState));
};

export const resetGame = () => (dispatch, getState) => {
  const { gameCode } = getState().play;
  dispatch(startNewGame(gameCode));
};

/**
 * @name moveToFreecell
 * @param {String} cardId 想要移動的卡片ID，ex: 'S6'
 * @param {String} targetId 目的地卡片區域ID，ex: 'freecell-0'
 * @param {String} sourceId 來源卡片區域ID，ex: 'tableauColumn-0'
 * @param {String} sourceType 來源卡片類別ID，ex: 'tableau'
 * @description 移動卡片到Freecells區域
 */
export const moveToFreecell = ({ cardId, targetId, sourceId, sourceType }) => (
  dispatch,
  getState,
) => {
  // 資訊不足，不處理
  if (!cardId || !sourceId || !targetId || !sourceType) return;

  // 1) 取得目前牌局
  const { game: gameState } = getState();

  // 2) 複製目前state
  const newGameState = _.cloneDeep(gameState);

  // 3) 移動卡片
  // 要確認: 1.目標freecell是不是空的 2.目的地位置有沒有這張卡片 3.卡片是否為目的地位置最後一張牌
  const sourceCells = newGameState[sourceType][sourceId];
  const targetCells = newGameState.freecells[targetId];

  // 3-1) 確認：目標freecell是不是空的
  const isFreecellEmpty = targetCells.length === 0;
  // 3-2) 確認：目的地位置有沒有這張卡片
  const isCardExist = sourceCells.includes(cardId);
  // 3-3) 確認：卡片是否為目的地位置最後一張牌
  const isCardLastItem =
    isCardExist && sourceCells.indexOf(cardId) === sourceCells.length - 1;

  // 3-4) 上述條件成立，[移除]來源位置的卡片；[新增]目的地位置卡片
  if (isFreecellEmpty && isCardExist && isCardLastItem) {
    sourceCells.pop();
    targetCells.push(cardId);
  }

  // 4) 更新牌局
  dispatch(updateGameState(newGameState));
};

/**
 * @name undoGameState
 * @description 回到上一個Game State
 */
export const undoGameState = () => (dispatch, getState) => {
  // 1) 移除最後一筆歷史紀錄
  dispatch(popHistoryMoves());
  // 2) 取得更新後的歷史紀錄的最後一筆
  const { historyMoves } = getState().play;
  const lastGameState = historyMoves[historyMoves.length - 1];
  const newGameState = _.cloneDeep(lastGameState);
  // 3) 更新Game State，但不新增歷程
  dispatch(updateGameState(newGameState, false));
};

/**
 * @name updateGameState
 * @param {Object} newGameState 欲更新的Game State
 * @param {Boolean} addHistory 是否要加進歷史紀錄中
 * @description
 * 更新Game State，多一個非必要參數用來忽略加入歷史紀錄這個行為
 * 比方說回復上一步的時候，不需要將這個動作加入歷史紀錄
 */
export const updateGameState = (
  newGameState,
  addHistory = true,
) => dispatch => {
  // 1) 更新Game State
  dispatch({ type: UPDATE_GAME, payload: { newGameState } });
  // 2) 新增步數
  dispatch(increaseMoves());
  // 3) 新增至歷史紀錄
  if (addHistory) dispatch(addHistoryMoves(newGameState));
};
