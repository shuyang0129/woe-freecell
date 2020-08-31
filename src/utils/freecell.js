import * as cells from '@constants/cells';
import * as suit from '@constants/suits';

import _ from 'lodash';

/*
 ** Club(c)     => 梅花 ♣
 ** Diamond(d)  => 鑽石 ♦
 ** Heart(h)    => 紅心 ♥
 ** Spade(s)    => 黑桃 ♠
 */

// prettier-ignore
const POKER_CARDS = [
  "C1", "D1", "H1", "S1", 
  "C2", "D2", "H2", "S2", 
  "C3", "D3", "H3", "S3", 
  "C4", "D4", "H4", "S4", 
  "C5", "D5", "H5", "S5", 
  "C6", "D6", "H6", "S6", 
  "C7", "D7", "H7", "S7", 
  "C8", "D8", "H8", "S8", 
  "C9", "D9", "H9", "S9", 
  "C10", "D10", "H10", "S10", 
  "C11", "D11", "H11", "S11", 
  "C12", "D12", "H12", "S12", 
  "C13", "D13", "H13", "S13" 
]

/**
 * @name newGame
 * @param {Number} gameId 牌局ID
 * @description
 * 產生新接龍牌局
 * 運算式來源：{@link https://rosettacode.org/wiki/Deal_cards_for_FreeCell}
 * 新接龍解答(到 gameId: 1000000 都有解)：{@link http://freecellgamesolutions.com/}
 */
export const generateNewGame = gameId => {
  const deck = [...POKER_CARDS];
  let seed = gameId;

  for (let len = 52; len >= 2; len--) {
    seed = (214013 * seed + 2531011) & 0x7fffffff;
    const index = (seed >> 16) % len;
    const last = len - 1;

    [deck[index], deck[last]] = [deck[last], deck[index]];
  }

  return deck.reverse();
};

/**
 * @name checkIsCardBlack
 * @param {String} card 卡片ID，ex: 'C1', 'H3'
 * @description 根據卡片ID，判斷是否花色為黑
 * @example checkIsCardBlack('H3') => false
 * @example checkIsCardBlack('C3') => true
 * @return Boolean
 */
export const checkIsCardBlack = card => {
  const cardsInBlack = new Set([suit.CLUB[0], suit.SPADE[0]]);
  return cardsInBlack.has(card[0]);
};

/**
 * @name checkIsValidSequence
 * @param {Array} cards 包含多張卡片ID的陣列，ex: ['H8', 'S7', 'D4']
 * @description 卡片是否為有效的排序（黑紅相間&&遞減數字）
 * @example checkIsValidSequence(['H8', 'S7', 'D4']) => false
 * @example checkIsValidSequence(['H8', 'S7', 'D6']) => true
 * @returns Boolean
 */
export const checkIsValidSequence = cards => {
  let isCardBlack = checkIsCardBlack(cards[0]);
  let cardNum = parseInt(cards[0].substr(1));

  // 如果排序小於數字1，回傳false
  if (cardNum < 1) return false;

  for (const card of cards) {
    const isValidColor = checkIsCardBlack(card) === isCardBlack;
    const isValidNum = parseInt(card.substr(1)) === cardNum;

    if (!isValidColor || !isValidNum) return false;

    isCardBlack = !isCardBlack;
    cardNum--;
  }

  return true;
};

/**
 * @name getSuitNameFromCard
 * @param {String} card Ex: 'C4'
 * @description 從簡寫得到牌色名稱，ex: 'C' => 'CLUB'
 * @returns Suit Name || null
 */
export const getSuitNameFromCard = card => {
  const suitCode = card[0];

  switch (suitCode) {
    case suit.CLUB[0]:
      return suit.CLUB;
    case suit.SPADE[0]:
      return suit.SPADE;
    case suit.HEART[0]:
      return suit.HEART;
    case suit.DIAMOND[0]:
      return suit.DIAMOND;
    default:
      return null;
  }
};

/**
 * @name getNumberFromCard
 * @param {String} card Ex: 'S6'
 * @description 從卡片取得數字
 * @returns Card Number
 */
export const getNumberFromCard = card => {
  return parseInt(card.substr(1));
};

/**
 * @name possibleMoveToFoundationCells
 * @param {Object} gameState 目前的Game State
 * @description 取得到FoundationCells的可能路徑
 * @returns Object
 * cardId => 可以移動的卡片ID，ex: 'C2'
 * targetId => 目標區域中Cell的ID，ex: CLUB
 * targetType => 哪個目標區域，ex: foundationCells
 * sourceId => 來源區域中Cell的ID，ex: freeCell-1
 * sourceType => 哪個來源區域，ex: freeCells
 */
export const possibleMoveToFoundationCells = gameState => {
  // 預設沒有possible move
  let possibleMove = null;
  // 複製game state，避免直接mutate物件
  const newGameState = _.cloneDeep(gameState);

  // 1) 取得每個FoundationCell需要的牌，並組成陣列
  const foundationCellsNeeds = Object.entries(newGameState.foundationCells).map(([suit, cell]) => {
    const suitCode = suit[0]; // 取得英文字，ex: 'H', 'S', 'C', 'D'
    const cardNum = cell.length + 1; // 取得需要的數字
    return cell.length === 13 ? null : `${suitCode}${cardNum}`; // 組成cardId
  });

  // 2) 先從Tableau中，找有沒有符合步驟1的牌
  Object.entries(newGameState.tableau).forEach(([tableauColumnId, tableauColumnCards]) => {
    // 如果找到了，就不用再執行接下來的程式碼
    if (!!possibleMove) return;
    // 取得Tableau Column的長度
    const tableauColumnLength = tableauColumnCards.length;
    // 如果長度不為零，表示裡面有牌，再深入進去找
    if (tableauColumnLength) {
      // 取得Tableau Column中，最後一張牌
      const lastCardInColumn = tableauColumnCards[tableauColumnLength - 1];
      // 對照步驟1的陣列，試著取得對應的index
      const indexInNeeds = foundationCellsNeeds.indexOf(lastCardInColumn);

      // 如果有找到，賦值給possibleMove
      if (indexInNeeds >= 0) {
        return (possibleMove = {
          cardId: lastCardInColumn,
          targetId: getSuitNameFromCard(foundationCellsNeeds[indexInNeeds]),
          targetType: cells.FOUNDATION_CELLS,
          sourceId: tableauColumnId,
          sourceType: cells.TABLEAU,
        });
      }
    }
  });

  // 1-3) 再來從FreeCells中，找有沒有FoundationCells需要的牌
  Object.entries(newGameState.freeCells).forEach(([freeCellId, freeCellCards]) => {
    // 如果找到了，就不用再執行接下來的程式碼
    if (!!possibleMove) return;
    // 如果freecell是空的，返回不做事
    if (freeCellCards.length === 0) return;

    const currentFreecellCard = freeCellCards[0];

    const indexInNeeds = foundationCellsNeeds.indexOf(currentFreecellCard);

    if (indexInNeeds >= 0) {
      return (possibleMove = {
        cardId: currentFreecellCard,
        targetId: getSuitNameFromCard(foundationCellsNeeds[indexInNeeds]),
        targetType: cells.FOUNDATION_CELLS,
        sourceId: freeCellId,
        sourceType: cells.FREE_CELLS,
      });
    }
  });

  return possibleMove;
};

/**
 * @name possibleMoveToTableau
 * @param {Object} gameState 目前的Game State
 * @description 取得到Tableau中的可能路徑
 * @returns Object
 * cardId => 可以移動的卡片ID，ex: 'S6'
 * targetId => 目標區域中Cell的ID，ex: tableauColumn-0
 * targetType => 哪個目標區域，ex: tableau
 * sourceId => 來源區域中Cell的ID，ex: tableauColumn-5
 * sourceType => 哪個來源區域，ex: tableau
 */
export const possibleMoveToTableau = gameState => {
  // 預設沒有possible move
  let possibleMove = null;
  // 複製game state，避免直接mutate物件
  const newGameState = _.cloneDeep(gameState);

  // 1) 取得每個TableauColumn的最後一張牌，並組成物件，以便未來取得Column的Key
  const everyLastCardInTableauColumn = {};

  Object.entries(newGameState.tableau).forEach(([columnId, cards]) => {
    const len = cards.length;
    everyLastCardInTableauColumn[columnId] = len > 0 ? cards[len - 1] : null;
  });

  // 從Tableau自身，交叉比對去找到可能的配對
  Object.entries(everyLastCardInTableauColumn).forEach(([matchedId, matchedCard]) => {
    // 如果matched card是空的，跳過不執行
    if (!matchedCard) return;
    // 如果找到了，就不用再執行接下來的程式碼
    if (!!possibleMove) return;

    Object.entries(everyLastCardInTableauColumn).forEach(([referenceId, referenceCard]) => {
      // 如果找到了，就不用再執行接下來的程式碼
      if (!!possibleMove) return;
      // 如果reference card是空的，因為可以接受任何一張牌，回傳第一張找到的牌
      if (!referenceCard) {
        return (possibleMove = {
          cardId: matchedCard,
          targetId: referenceId,
          targetType: cells.TABLEAU,
          sourceId: matchedId,
          sourceType: cells.TABLEAU,
        });
      }
      // 同一個顏色的話，跳過
      if (checkIsCardBlack(matchedCard) === checkIsCardBlack(referenceCard)) return;

      // 如果Reference Card不是1，且確認數字是符合的話，就更新possibleMove
      const matchedCardNum = getNumberFromCard(matchedCard);
      const referenceCardNum = getNumberFromCard(referenceCard);

      if (referenceCardNum > 1 && matchedCardNum === referenceCardNum - 1) {
        return (possibleMove = {
          cardId: matchedCard,
          targetId: referenceId,
          targetType: cells.TABLEAU,
          sourceId: matchedId,
          sourceType: cells.TABLEAU,
        });
      }
    });
  });
  return possibleMove;
};

/**
 * @name possibleMoveToFreeCells
 * @param {Object} gameState 目前的Game State
 * @description 取得到FreeCells中的可能路徑
 * @returns Object
 * cardId => 可以移動的卡片ID，ex: 'S6'
 * targetId => 目標區域中Cell的ID，ex: tableauColumn-0
 * targetType => 哪個目標區域，ex: tableau
 * sourceId => 來源區域中Cell的ID，ex: freecell-5
 * sourceType => 哪個來源區域，ex: freecells
 */
export const possibleMoveToFreeCells = gameState => {
  let possibleMove = null;

  const newGameState = _.cloneDeep(gameState);

  // 1) 取得每個TableauColumn的最後一張牌，並組成物件，以便未來取得Column的Key
  const everyLastCardInTableauColumn = {};

  Object.entries(newGameState.tableau).forEach(([columnId, cards]) => {
    const len = cards.length;
    everyLastCardInTableauColumn[columnId] = len > 0 ? cards[len - 1] : null;
  });

  // 3-1) 取出每個Freecell的卡片
  Object.entries(newGameState.freeCells).forEach(([freeCellId, freeCellCards]) => {
    // 如果找到了，就不用再執行接下來的程式碼
    if (!!possibleMove) return;

    // 如果Freecell有空位，因為可以接受任何一張牌，回傳第一張找到的牌
    const len = freeCellCards.length;
    if (len === 0) {
      Object.entries(everyLastCardInTableauColumn).forEach(([matchedId, matchedCard]) => {
        // 如果找到了，就不用再執行接下來的程式碼
        if (!!possibleMove) return;
        // 找到第一張可以移動的牌，更新possibleMove
        if (!!matchedCard) {
          return (possibleMove = {
            cardId: matchedCard,
            targetId: freeCellId,
            targetType: cells.FREE_CELLS,
            sourceId: matchedId,
            sourceType: cells.TABLEAU,
          });
        }
      });
    }
  });
  return possibleMove;
};

/**
 * @name getSelectingCards
 * @param {Object}
 *  cardId => 被選取的卡片ID
 *  sourceType => 被選取卡片的區域是哪個
 *  sourceId => 被選取卡片的區域ID
 *  gameState => 目前的Game state
 * @description 找出被選取的卡片們
 * @reutrn 回傳被選取的卡片陣列
 */
export const getSelectingCards = (gameState, { cardId, sourceType, sourceId }) => {
  const gameStateClone = _.cloneDeep(gameState);
  const sourceCells = gameStateClone[sourceType][sourceId];

  // 先取得卡片Index
  const sourceCardIndex = sourceCells.indexOf(cardId);
  // 如果不存在這張卡片，不做任何事
  if (sourceCardIndex < 0) return;

  // 取得被選取的卡片們(這個情況可能多張)
  const selectingCards = sourceCells.slice(sourceCardIndex);

  return selectingCards;
};

/**
 * @name checkIsCardDraggable
 * @description 檢查指定卡片是否可以被拖曳，根據不同區域會有不同規則
 */
export const checkIsCardDraggable = (gameState, { cardId, sourceType, sourceId }) => {
  const gameStateClone = _.cloneDeep(gameState);
  const sourceCell = gameStateClone[sourceType][sourceId];

  const isCardExist = sourceCell.includes(cardId);

  // 如果是FreeCells，有卡片存在就可以拖曳
  if (sourceType === cells.FREE_CELLS) {
    return isCardExist;
  }

  // 如果是FoundationCells，有這張卡片而且這張卡片是最後一張的話，可以拖曳
  if (sourceType === cells.FOUNDATION_CELLS) {
    const isCardLastItem = sourceCell.indexOf(cardId) === sourceCell.length - 1;
    return isCardExist && isCardLastItem;
  }

  // 如果是Tableau，有這張卡片，然後是合法排序(花色相間、遞減排序)
  if (sourceType === cells.TABLEAU) {
    const selectingCards = getSelectingCards(gameStateClone, { cardId, sourceType, sourceId });
    const isValidSequence = checkIsValidSequence(selectingCards);
    return isCardExist && isValidSequence;
  }

  return false;
};
