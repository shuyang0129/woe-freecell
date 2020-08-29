import { INIT_GAME, UPDATE_GAME } from './actionTypes';

import {
  addHistoryMoves,
  increaseMoves,
  initPlay,
  popHistoryMoves,
  updateGameCode,
  updatePossibleMove,
} from './playAction';

import _ from 'lodash';
import { generateNewGame, checkIsValidSequence, possibleMoveToFreeCells } from '@utils/freecell';
import { randomNum } from '@utils';
import { possibleMoveToFoundationCells, possibleMoveToTableau } from '../utils/freecell';

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

export const restartGame = () => (dispatch, getState) => {
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
  const isCardLastItem = isCardExist && sourceCells.indexOf(cardId) === sourceCells.length - 1;

  // 3-4) 上述條件成立，[移除]來源位置的卡片；[新增]目的地位置卡片
  if (isFreecellEmpty && isCardExist && isCardLastItem) {
    sourceCells.pop();
    targetCells.push(cardId);
    // 4) 更新牌局
    dispatch(updateGameState(newGameState));
  }
};

/**
 * @name moveToFreecell
 * @param {String} cardId 想要移動的卡片ID，ex: 'C3'
 * @param {String} targetId 目的地卡片區域ID，ex: 'CLUB'
 * @param {String} sourceId 來源卡片區域ID，ex: 'freecell'
 * @param {String} sourceType 來源卡片類別ID，ex: 'freecells'
 * @description 移動卡片到FoundationCells區域
 */
export const moveToFoundationCell = ({ cardId, targetId, sourceId, sourceType }) => (
  dispatch,
  getState,
) => {
  // 1) 取得目前牌局
  const { game: gameState } = getState();

  // 2) 複製目前state
  const newGameState = _.cloneDeep(gameState);

  // 3) 移動卡片
  const sourceCells = newGameState[sourceType][sourceId];
  const targetCells = newGameState.foundationCells[targetId];

  // 3-0) 如果FoundationCells已經滿了，不做其他動作
  if (targetCells.length >= 13) return;

  // 3-1) 確認前提
  // 確認：卡片是FoundationCell需要的卡片(牌色、大小)
  const suitCode = targetId[0];
  const cardNum = targetCells.length + 1;
  const correctCardId = `${suitCode}${cardNum}`;
  const isCardCorrect = cardId === correctCardId;

  // 確認：目的地位置有沒有這張卡片
  const isCardExist = sourceCells.includes(cardId);
  // 確認：卡片是否為目的地位置最後一張牌
  const isCardLastItem = isCardExist && sourceCells.indexOf(cardId) === sourceCells.length - 1;

  // 3-2) 移除來源卡片;將卡片加入目標區域
  if (isCardCorrect && isCardExist && isCardLastItem) {
    sourceCells.pop();
    targetCells.push(cardId);
    // 3-3) 更新牌局
    dispatch(updateGameState(newGameState));
  }
};

/**
 * @name moveToFreecell
 * @param {String} cardId 想要移動的卡片ID，ex: 'C3'
 * @param {String} targetId 目的地卡片區域ID，ex: 'tableauColumn-0'
 * @param {String} sourceId 來源卡片區域ID，ex: 'freecell'
 * @param {String} sourceType 來源卡片類別ID，ex: 'freecells'
 * @description 移動卡片到Tableau區域
 */
export const moveToTableau = ({ cardId, targetId, sourceId, sourceType }) => (
  dispatch,
  getState,
) => {
  // 1) 取得目前牌局
  const { game: gameState } = getState();

  // 2) 複製目前state
  const newGameState = _.cloneDeep(gameState);

  const sourceCells = newGameState[sourceType][sourceId];
  const targetCells = newGameState.tableau[targetId];

  // 3) 確認前提
  // 3-1) [確認]卡片存在
  // 先取得卡片Index
  const sourceCardIndex = sourceCells.indexOf(cardId);
  // 如果不存在這張卡片，不做任何事
  if (sourceCardIndex < 0) return;

  //  3-2) [確認]有效排序（花色應該要相間、數字應該要遞減排序）
  // 取得移動中卡片們(這個情況可能多張)
  const movingCards = sourceCells.slice(sourceCardIndex);
  // 如果移動中的卡片是無效的排序，不做任何事
  if (!checkIsValidSequence(movingCards)) return;

  // 4) 移除來源卡片;將卡片加入目標區域
  sourceCells.splice(sourceCardIndex, movingCards.length);
  targetCells.push(...movingCards);

  // 5) 更新牌局
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
export const updateGameState = (newGameState, addHistory = true) => dispatch => {
  // 1) 更新Game State
  dispatch({ type: UPDATE_GAME, payload: { newGameState } });
  // 2) 新增步數
  dispatch(increaseMoves());
  // 3) 新增至歷史紀錄
  if (addHistory) dispatch(addHistoryMoves(newGameState));
  // 4) 更新可移動路徑，如果沒有步數可以用來宣告遊戲結束
  dispatch(findPossibleMove());
};

/**
 * @name findPossibleMove
 * @description 搜尋可移動的路徑，優先順序為：1.FoundationCells 2.Tableau 3.FreeCells
 */
export const findPossibleMove = () => (dispatch, getState) => {
  let possibleMove = null;

  const { game: gameState } = getState();
  const newGameState = _.cloneDeep(gameState);

  // 1) 先找，到FoundationCells的可能路徑
  if (!possibleMove) possibleMove = possibleMoveToFoundationCells(newGameState);
  // 2) 再找，到Tableau的可能路徑
  if (!possibleMove) possibleMove = possibleMoveToTableau(newGameState);
  // 3) 最後找，到FreeCells的可能路徑
  if (!possibleMove) possibleMove = possibleMoveToFreeCells(newGameState);

  dispatch(updatePossibleMove(possibleMove));
};
