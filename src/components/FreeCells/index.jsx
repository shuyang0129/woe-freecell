import * as S from './style';

import React, { memo } from 'react';

import Card from '@components/Card';

/**
 * @name FreeCells
 * @description 左上角的空白欄框，可以任意放一張紙牌
 */
const FreeCells = () => {
  return (
    <S.FreeCells>
      <S.FreeCell>
        <Card name="C1" />
      </S.FreeCell>
      <S.FreeCell />
      <S.FreeCell />
      <S.FreeCell />
    </S.FreeCells>
  );
};

export default memo(FreeCells);
