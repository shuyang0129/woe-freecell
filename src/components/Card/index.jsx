import * as S from './style';

import React, { memo, useEffect, useState } from 'react';

import { useDrag } from 'react-dnd';

const Card = props => {
  const [imgSrc, setImgSrc] = useState(null);
  const [collectedProps, drag] = useDrag({
    item: { name: props.name, type: 'CARD' },
    begin: monitor => console.log(monitor, props),
  });

  /**
   * @name getImg
   * @param {string} cardId 撲克牌圖片名稱，ex: 'c1'
   * @description 使用dynamic import，載入撲克牌圖片
   * @returns Promise => res.default 才是我們要的值
   */
  const getImg = cardId => import(`@assets/img/cards/${cardId}.png`);

  useEffect(() => {
    getImg(props.cardId).then(({ default: src }) => setImgSrc(src));
  }, [props.cardId]);

  return !!imgSrc ? <S.Card src={imgSrc} alt="poker card" ref={drag} /> : null;
};

export default memo(Card);
