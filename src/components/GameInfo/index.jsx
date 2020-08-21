import React from 'react';

import InfoSvg from '@assets/img/info.svg';

import * as S from './style';

const GameInfo = () => {
  return (
    <S.GameInfo>
      <S.InfoIcon>
        <img src={InfoSvg} alt="Info icon" />
      </S.InfoIcon>
      <span>TIME: 00:00</span>
      <span>SCORE: 0</span>
    </S.GameInfo>
  );
};

export default GameInfo;