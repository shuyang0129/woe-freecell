import Card from '@components/Card';
import React from 'react';
import uniqid from 'uniqid';

/**
 * @name renderCards
 * @param {Array} cards 富含卡片的陣列
 * @param {Object} additionalProps 其他想要傳入的props
 * @description 傳入array of cards，並渲染卡片
 * @tutorial
 * renderCards(["S6, S7"], {left: 10, top: 12)
 * => <><Card cardId="S6" left={10} top={12} /><Card cardId="S7" left={10} top={12} /></>
 * @return Components
 */
export const renderCards = (cards, additionalProps) => {
  if (!!cards && cards.length > 0) {
    return cards.map(cardId => <Card key={uniqid()} cardId={cardId} {...additionalProps} />);
  }
};
