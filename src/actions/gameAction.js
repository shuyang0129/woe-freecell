import { INIT_GAME, UPDATE_GAME } from './actionTypes';
import {
  addHistoryMoves,
  increaseMoves,
  initPlay,
  popHistoryMoves,
  updateGameCode,
  updatePossibleMove,
} from './playAction';
import {
  checkIsValidSequence,
  generateNewGame,
  possibleMoveToFoundationCells,
  possibleMoveToFreeCells,
  possibleMoveToTableau,
  getSuitNameFromCard,
} from '@utils/freecell';
import { initCardLocations } from './locationAction';

import _ from 'lodash';
import { randomNum } from '@utils';
import * as cells from '@constants/cells';

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
  dispatch(initCardLocations(game));

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
 * @name moveToFreeCell
 * @param {String} cardId 想要移動的卡片ID，ex: 'S6'
 * @param {String} targetId 目的地卡片區域ID，ex: 'freeCell-0'
 * @param {String} sourceId 來源卡片區域ID，ex: 'tableauColumn-0'
 * @param {String} sourceType 來源卡片類別ID，ex: 'tableau'
 * @description 移動卡片到FreeCells區域
 */
export const moveToFreeCell = ({ cardId, targetId, sourceId, sourceType }) => (
  dispatch,
  getState,
) => {
  // 1) 取得目前牌局
  const { game: gameState } = getState();

  // 2) 複製目前state
  const newGameState = _.cloneDeep(gameState);

  // 3) 移動卡片
  // 要確認: 1.目標freeCell是不是空的 2.目的地位置有沒有這張卡片 3.卡片是否為目的地位置最後一張牌
  const sourceCell = newGameState[sourceType][sourceId];
  const targetCells = newGameState.freeCells[targetId];

  // 3-1) 確認：目標freeCell是不是空的
  const isFreeCellEmpty = targetCells.length === 0;
  // 3-2) 確認：目的地位置有沒有這張卡片
  const isCardExist = sourceCell.includes(cardId);
  // 3-3) 確認：卡片是否為目的地位置最後一張牌
  const isCardLastItem = isCardExist && sourceCell.indexOf(cardId) === sourceCell.length - 1;

  // 3-4) 上述條件成立，[移除]來源位置的卡片；[新增]目的地位置卡片
  if (isFreeCellEmpty && isCardExist && isCardLastItem) {
    sourceCell.pop();
    targetCells.push(cardId);
    // 4) 更新牌局
    dispatch(updateGameState(newGameState));
  }
};

/**
 * @name moveToFreeCell
 * @param {String} cardId 想要移動的卡片ID，ex: 'C3'
 * @param {String} targetId 目的地卡片區域ID，ex: 'CLUB'
 * @param {String} sourceId 來源卡片區域ID，ex: 'freeCell'
 * @param {String} sourceType 來源卡片類別ID，ex: 'freeCells'
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
  const sourceCell = newGameState[sourceType][sourceId];
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
  const isCardExist = sourceCell.includes(cardId);
  // 確認：卡片是否為目的地位置最後一張牌
  const isCardLastItem = isCardExist && sourceCell.indexOf(cardId) === sourceCell.length - 1;

  // 3-2) 移除來源卡片;將卡片加入目標區域
  if (isCardCorrect && isCardExist && isCardLastItem) {
    sourceCell.pop();
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

  const sourceCell = newGameState[sourceType][sourceId];
  const targetCell = newGameState.tableau[targetId];

  // 3) 確認是否可以移動
  // 3-1) [確認]卡片存在
  // 先取得卡片Index
  const sourceCardIndex = sourceCell.indexOf(cardId);
  // 如果不存在這張卡片，不做任何事
  if (sourceCardIndex < 0) return;

  //  3-2) [確認]有效排序（花色應該要相間、數字應該要遞減排序）
  // 取得移動中卡片們(這個情況可能多張)
  const movingCards = sourceCell.slice(sourceCardIndex);
  // 如果移動中的卡片是無效的排序，不做任何事
  if (!checkIsValidSequence(movingCards)) return;

  //  4) 如果目標區域不是空的，確定卡片是否可以放置
  if (targetCell.length) {
    // 3-2-1) 如果目標區域不是空的，連同目標區域最後一張確認是否是有效排序
    const lastCardInTargetCells = targetCell[targetCell.length - 1];
    // 4-2) 取得移動中卡片們(這個情況可能多張)
    const movingCards = sourceCell.slice(sourceCardIndex);
    // 4-3) 加入目標區域最後一張牌
    movingCards.unshift(lastCardInTargetCells);
    // 如果是無效排序，不做任何事情
    if (!checkIsValidSequence(movingCards)) return;
  }

  // 5) 移除來源卡片;將卡片加入目標區域
  sourceCell.splice(sourceCardIndex, movingCards.length);
  targetCell.push(...movingCards);

  // 6) 更新牌局
  dispatch(updateGameState(newGameState));
};

export const moveAutomatically = ({ cardId, sourceId, sourceType }) => (dispatch, getState) => {
  // 1) 取得目前牌局
  const { game: gameState } = getState();
  // 2) 複製目前state
  const newGameState = _.cloneDeep(gameState);
  // 3) 取得目前牌的cell區域
  const sourceCell = newGameState[sourceType][sourceId];

  // 4) [防錯]如果來自Tableau，確認是不是TableColumn最後一張牌
  const isFromTableau = sourceType === cells.TABLEAU;
  const isLastCardInTableauColumn = isFromTableau && sourceCell[sourceCell.length - 1] === cardId;
  // 來自Tableau，但不是Tableau的最後一張牌，就略過
  if (isFromTableau && !isLastCardInTableauColumn) return;

  // 5) 找尋可放置位置，優先順序：foundationCells -> freeCells
  // 5-1) [foundationCells]先找到對應牌色的foundationCell，看看指定牌是不是被需要的牌
  // 指定牌的牌色
  const currentSuit = getSuitNameFromCard(cardId);
  // 同牌色的foundationCell目前需要什麼牌
  const suitCode = currentSuit[0];
  const cellLength = newGameState.foundationCells[currentSuit].length;
  const cardNum = cellLength + 1;
  const cardTheyNeed = `${suitCode}${cardNum}`;

  // 如果指定牌等於對應foundationCell所需要的牌，將牌移動到對應的foundationCell
  if (cardId === cardTheyNeed && cellLength <= 13) {
    return dispatch(
      moveToFoundationCell({
        cardId,
        sourceId,
        sourceType,
        targetId: currentSuit,
      }),
    );
  }

  // 5-2) [freeCells]看看是否有空位，沒有就略過，有就將牌移動到第一個空位
  // 進入迴圈，當找到的第一個freeCell是空的時候，將牌放進去
  Object.entries(newGameState.freeCells).forEach(([freeCellId, freeCell]) => {
    if (freeCell.length === 0) {
      return dispatch(
        moveToFreeCell({
          cardId,
          sourceId,
          sourceType,
          targetId: freeCellId,
        }),
      );
    }
  });
};

/**
 * @name undoGameState
 * @description 回到上一個Game State
 */
export const undoGameState = () => (dispatch, getState) => {
  // 如果沒有步數，就沒有上一步可以回，不執行任何事
  if (getState().play.historyMoves.length <= 1) return;

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
