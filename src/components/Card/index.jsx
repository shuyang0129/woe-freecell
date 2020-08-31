import * as S from './style';
import * as dndType from '@constants/dndType';

import React, { memo, useEffect, useState } from 'react';
import { checkIsCardDraggable, checkIsCardDragging } from '@utils/freecell';

import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { getEmptyImage } from 'react-dnd-html5-backend';

const Card = ({ cardId, sourceType, sourceId }) => {
  const [imgSrc, setImgSrc] = useState(null);

  const game = useSelector(({ game }) => game);

  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      cardId,
      type: dndType.CARD,
      sourceType,
      sourceId,
    },
    canDrag: () => checkIsCardDraggable(game, { cardId, sourceType, sourceId }),
    isDragging: () => checkIsCardDragging(game, { cardId, sourceType, sourceId }),
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

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

  return !!imgSrc ? (
    <S.Card
      style={{ opacity: isDragging ? '0' : '100%' }}
      src={imgSrc}
      alt="poker card"
      ref={drag}
    />
  ) : null;
};

export default memo(Card);
