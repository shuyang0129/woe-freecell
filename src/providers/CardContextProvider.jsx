import React, { createContext } from 'react';
import { POKER_CARDS } from '@utils/freecell';

const imgSrc = {};

// Loop，將每張牌的圖片存入imgSrc物件中，並使用ContextProvider供子層使用
POKER_CARDS.forEach(cardId => (imgSrc[cardId] = require(`@img/cards/${cardId}.png`)));

export const CardContext = createContext();

const CardContextProvider = ({ children }) => {
  return <CardContext.Provider value={imgSrc}>{children}</CardContext.Provider>;
};

export default CardContextProvider;
