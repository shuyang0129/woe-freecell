import * as S from './style';
import * as dndType from '@constants/dndType';

import React, { memo, useEffect, useState } from 'react';

import { checkIsCardDraggable } from '../../utils/freecell';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

const Card = ({ cardId, sourceType, sourceId }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const game = useSelector(({ game }) => game);
  const [collectedProps, drag] = useDrag({
    item: {
      id: cardId,
      type: dndType.CARD,
    },
    begin: monitor => console.log('canDrag', !!monitor.canDrag(), collectedProps),
    canDrag: () => checkIsCardDraggable(game, { cardId, sourceType, sourceId }),
    collect: monitor => ({
      canDrag: !!monitor.canDrag(),
    }),
  });

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
