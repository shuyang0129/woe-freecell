import * as S from './style';

import React from 'react';
import { renderCards } from '@utils/renderCard';
import { useSelector } from 'react-redux';

const FoundationCells = () => {
  //FoundationCell裡面的全部資訊
  const foundationCellsData = useSelector(({ game }) => game.foundationCells);

  // 渲染各個FoundationCell
  const renderEachFoundationCell = foundationCellsData => {
    return Object.entries(foundationCellsData).map(
      ([foundationCellId, foundationCellCards]) => {
        return (
          <S.FoundationCell key={foundationCellId} suit={foundationCellId}>
            {renderCards(foundationCellCards)}
          </S.FoundationCell>
        );
      },
    );
  };

  return (
    <S.FoundationCells>
      {renderEachFoundationCell(foundationCellsData)}
    </S.FoundationCells>
  );
};

export default FoundationCells;
