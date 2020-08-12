/*
 ** Clubs(c) => 梅花 ♣
 ** Diamonds(d) => 鑽石 ♦
 ** Hearts(h) => 紅心 ♥
 ** Spades(s) => 黑桃 ♠
 */

// prettier-ignore
const POKER_CARDS = [
  "Ac", "Ad", "Ah", "As", 
  "2c", "2d", "2h", "2s", 
  "3c", "3d", "3h", "3s", 
  "4c", "4d", "4h", "4s", 
  "5c", "5d", "5h", "5s", 
  "6c", "6d", "6h", "6s", 
  "7c", "7d", "7h", "7s", 
  "8c", "8d", "8h", "8s", 
  "9c", "9d", "9h", "9s", 
  "Tc", "Td", "Th", "Ts", 
  "Jc", "Jd", "Jh", "Js", 
  "Qc", "Qd", "Qh", "Qs", 
  "Kc", "Kd", "Kh", "Ks" 
]

/**
 * @name newGame
 * @param {Number} gameId 牌局ID
 * @description
 * 產生新接龍牌局
 * 運算式來源：{@link https://rosettacode.org/wiki/Deal_cards_for_FreeCell}
 * 新接龍解答(到 gameId: 1000000 都有解)：{@link http://freecellgamesolutions.com/}
 */
const newGame = gameId => {
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
