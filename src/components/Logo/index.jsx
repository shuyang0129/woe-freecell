import React from 'react';

import King from '@assets/img/logo/king_happy.png';

import * as S from './style';

const Logo = ({ title = 'FREECELL' }) => {
  return (
    <S.Logo>
      <img src={King} alt="King logo" />
      <h1>{title.toUpperCase()}</h1>
    </S.Logo>
  );
};

export default Logo;
