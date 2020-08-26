import * as S from './style';

import React, { memo } from 'react';

import { renderCards } from '@utils/renderCard';
import { useSelector } from 'react-redux';

/**
 * @name FreeCells
 * @description 左上角的空白欄框，可以任意放一張紙牌
 */
const FreeCells = () => {
  // FreeCells裡面的全部資訊
  const freecellsData = useSelector(({ game }) => game.freecells);

  // 渲染各個Freecell
  const renderEachFreeCell = freecellsData => {
    return Object.entries(freecellsData).map(([freecellId, freecellCards]) => {
      return (
        <S.FreeCell key={freecellId}>{renderCards(freecellCards)}</S.FreeCell>
      );
    });
  };

  return <S.FreeCells>{renderEachFreeCell(freecellsData)}</S.FreeCells>;
};

export default memo(FreeCells);
