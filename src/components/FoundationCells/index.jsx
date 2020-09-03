import * as S from './style';
import * as cells from '@constants/cells';

import React, { memo } from 'react';

import FoundationCell from './FoudationCell';
import { uniqueId } from 'lodash';
import { useSelector } from 'react-redux';

const FoundationCells = () => {
  //FoundationCell裡面的全部資訊
  const game = useSelector(({ game }) => game);

  // 渲染各個FoundationCell
  const renderEachFoundationCell = foundationCellsData => {
    return Object.entries(foundationCellsData).map(([foundationCellId, foundationCellCards]) => {
      const sourceInfo = {
        sourceId: foundationCellId,
        sourceType: cells.FOUNDATION_CELLS,
      };

      return (
        <FoundationCell
          key={uniqueId()}
          foundationCellCards={foundationCellCards}
          {...sourceInfo}
        />
      );
    });
  };

  return <S.FoundationCells>{renderEachFoundationCell(game.foundationCells)}</S.FoundationCells>;
};

export default memo(FoundationCells);
