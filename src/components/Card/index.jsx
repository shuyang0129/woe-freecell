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
   * @param {string} name 撲克牌圖片名稱，ex: 'c1'
   * @description 使用dynamic import，載入撲克牌圖片
   * @returns Promise => res.default 才是我們要的值
   */
  const getImg = name => import(`@assets/img/cards/${name}.png`);

  useEffect(() => {
    getImg(props.name).then(({ default: src }) => setImgSrc(src));
  }, [props.name]);

  return !!imgSrc ? <S.Card src={imgSrc} alt="poker card" ref={drag} /> : null;
};

export default memo(Card);
