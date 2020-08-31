import * as S from './style';
import * as cells from '@constants/cells';

import React, { memo } from 'react';
import { renderCards } from '@utils/renderCard';
import { useSelector } from 'react-redux';

const FoundationCells = () => {
  //FoundationCell裡面的全部資訊
  const foundationCellsData = useSelector(({ game }) => game.foundationCells);

  // 渲染各個FoundationCell
  const renderEachFoundationCell = foundationCellsData => {
    return Object.entries(foundationCellsData).map(([foundationCellId, foundationCellCards]) => {
      const additionalInfo = {
        sourceId: foundationCellId,
        sourceType: cells.FOUNDATION_CELLS,
      };

      return (
        <S.FoundationCell key={foundationCellId} suit={foundationCellId}>
          {renderCards(foundationCellCards, additionalInfo)}
        </S.FoundationCell>
      );
    });
  };

  return <S.FoundationCells>{renderEachFoundationCell(foundationCellsData)}</S.FoundationCells>;
};

export default memo(FoundationCells);
