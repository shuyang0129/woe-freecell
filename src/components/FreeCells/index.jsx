import * as S from './style';
import * as cells from '@constants/cells';

import React, { memo } from 'react';

import FreeCell from './FreeCell';
import { uniqueId } from 'lodash';
import { useSelector } from 'react-redux';

/**
 * @name FreeCells
 * @description 左上角的空白欄框，可以任意放一張紙牌
 */
const FreeCells = () => {
  // FreeCells裡面的全部資訊
  const game = useSelector(({ game }) => game);

  // 渲染各個Freecell
  const renderEachFreeCell = freeCellsData => {
    return Object.entries(freeCellsData).map(([freecellId, freecellCards]) => {
      const sourceInfo = {
        sourceId: freecellId,
        sourceType: cells.FREE_CELLS,
      };
      return <FreeCell key={uniqueId()} freecellCards={freecellCards} {...sourceInfo} />;
    });
  };

  return <S.FreeCells>{renderEachFreeCell(game.freeCells)}</S.FreeCells>;
};

export default memo(FreeCells);
