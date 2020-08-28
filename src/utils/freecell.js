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
  const cardsInBlack = new Set(['C', 'S']);
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
