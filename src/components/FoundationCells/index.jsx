import * as S from './style';

import Card from '@components/Card';
import React from 'react';

const FoundationCells = () => {
  return (
    <S.FoundationCells>
      <S.FoundationCell>
        <Card name="C1" />
        <Card name="C2" />
      </S.FoundationCell>
      <S.FoundationCell />
      <S.FoundationCell />
      <S.FoundationCell />
    </S.FoundationCells>
  );
};

export default FoundationCells;
