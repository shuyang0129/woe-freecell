import * as S from './style';
import * as dndType from '@constants/dndType';

import React, { memo, useEffect, useState } from 'react';
import {
  checkIsCardDraggable,
  checkIsValidSequence,
  getSelectingCards,
} from '../../utils/freecell';

import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

const Card = ({ cardId, sourceType, sourceId }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const game = useSelector(({ game }) => game);
  const [collectedProps, drag] = useDrag({
    item: {
      cardId,
      type: dndType.CARD,
      sourceType,
      sourceId,
    },
    begin: monitor => console.log('begin', monitor.getItem(), collectedProps),
    canDrag: () => checkIsCardDraggable(game, { cardId, sourceType, sourceId }),
    isDragging: monitor => {
      const draggingItem = monitor.getItem();
      const { cardId, sourceType, sourceId } = draggingItem;

      if (!cardId || !sourceType || !sourceId) return false;

      const draggingCards = getSelectingCards(game, { cardId, sourceType, sourceId });
      const isValidSequence = checkIsValidSequence(draggingCards);

      return isValidSequence && draggingCards.includes(cardId);
    },
    collect: monitor => ({
      canDrag: !!monitor.canDrag(),
      isDragging: monitor.isDragging(),
      items: getSelectingCards(game, { cardId, sourceType, sourceId }),
    }),
  });

  useEffect(() => {
    console.log('Ha', collectedProps);
    if (collectedProps.isDragging && collectedProps.canDrag) {
    }
  }, [collectedProps]);

  /**
   * @name getImg
   * @param {string} cardId 撲克牌圖片名稱，ex: 'C1'
   * @description 使用dynamic import，載入撲克牌圖片
   * @returns Promise => res.default 才是我們要的值
   */
  const getImg = cardId => import(`@assets/img/cards/${cardId}.png`);

  useEffect(() => {
    getImg(cardId).then(({ default: src }) => setImgSrc(src));
  }, [cardId]);

  return !!imgSrc ? <S.Card src={imgSrc} alt="poker card" ref={drag} /> : null;
};

export default memo(Card);
