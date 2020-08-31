import * as S from './style';
import * as cells from '@constants/cells';

import React, { memo } from 'react';
import { renderCards } from '@utils/renderCard';
import { useSelector } from 'react-redux';

const Tableau = () => {
  const tableauData = useSelector(({ game }) => game.tableau);

  const renderTableColumns = tableauData => {
    return Object.entries(tableauData).map(([tableauColumnId, tableauColumnData]) => {
      const additionalInfo = {
        sourceId: tableauColumnId,
        sourceType: cells.TABLEAU,
      };

      return (
        <S.TableauColumn key={tableauColumnId}>
          {renderCards(tableauColumnData, additionalInfo)}
        </S.TableauColumn>
      );
    });
  };

  return <S.Tableau>{renderTableColumns(tableauData)}</S.Tableau>;
};

export default memo(Tableau);
