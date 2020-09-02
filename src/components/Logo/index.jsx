import * as S from './style';

import React, { memo } from 'react';

import King from '@assets/img/logo/king_happy.png';

const Logo = ({ title = 'FREECELL' }) => {
  return (
    <S.Logo>
      <img src={King} alt="King logo" />
      <h1>{title}</h1>
    </S.Logo>
  );
};

export default memo(Logo);
