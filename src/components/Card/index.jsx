import React, { useState, useEffect, memo } from 'react';

import * as S from './style';

const Card = ({ name }) => {
  const [imgSrc, setImgSrc] = useState(null);

  /**
   * @name getImg
   * @param {string} name 撲克牌圖片名稱，ex: 'c1'
   * @description 使用dynamic import，載入撲克牌圖片
   * @returns Promise => res.default 才是我們要的值
   */
  const getImg = name => import(`@assets/img/cards_background/${name}.png`);

  useEffect(() => {
    getImg(name).then(({ default: src }) => setImgSrc(src));
  }, []);

  return !!imgSrc ? <S.Card src={imgSrc} alt="poker card" /> : null;
};

export default memo(Card);
