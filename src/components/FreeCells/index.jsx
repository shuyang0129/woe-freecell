import { renderCards } from '@utils/renderCard';
import { useSelector } from 'react-redux';
import React, { memo } from 'react';

import * as S from './style';

/**
 * @name FreeCells
 * @description 左上角的空白欄框，可以任意放一張紙牌
 */
const FreeCells = () => {
  // FreeCells裡面的全部資訊
  const freeCellsData = useSelector(({ game }) => game.freeCells);

  // 渲染各個Freecell
  const renderEachFreeCell = freeCellsData => {
    return Object.entries(freeCellsData).map(([freecellId, freecellCards]) => {
      return <S.FreeCell key={freecellId}>{renderCards(freecellCards)}</S.FreeCell>;
    });
  };

  return <S.FreeCells>{renderEachFreeCell(freeCellsData)}</S.FreeCells>;
};

export default memo(FreeCells);
