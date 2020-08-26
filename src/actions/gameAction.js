import _ from 'lodash';
import { generateNewGame } from '@utils/freecell';
import { randomNum } from '@utils';

import { INIT_GAME, UPDATE_GAME } from './actionTypes';

/**
 * @name startNewGame
 * @param {Number} gameCode 牌局局號
 * @description 開始新牌局
 */
export const startNewGame = gameCode => (dispatch, getState) => {
  // 1) 初始化遊戲狀態
  dispatch({ type: INIT_GAME });

  // 2) 取得game code或隨機產生
  const code = gameCode === undefined ? randomNum(1000000) : gameCode;

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
  dispatch(updateGame(newGameState));
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
  dispatch(updateGame(newGameState));
};

const updateGame = newGameState => dispatch => {
  dispatch({ type: UPDATE_GAME, payload: { newGameState } });
};
