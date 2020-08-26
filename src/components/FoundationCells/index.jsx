import * as S from './style';
import * as suit from '@constants/suits';

import Card from '@components/Card';
import React from 'react';

const FoundationCells = () => {
  return (
    <S.FoundationCells>
      <S.FoundationCell suit={suit.SPADE}>
        {/* <Card name="C1" />
        <Card name="C2" /> */}
      </S.FoundationCell>
      <S.FoundationCell suit={suit.HEART} />
      <S.FoundationCell suit={suit.DIAMOND} />
      <S.FoundationCell suit={suit.CLUB} />
    </S.FoundationCells>
  );
};

export default FoundationCells;
