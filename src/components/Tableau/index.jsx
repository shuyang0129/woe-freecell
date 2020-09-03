import * as S from './style';
import * as cells from '@constants/cells';

import React, { memo } from 'react';
import { renderCards } from '@utils/renderCard';
import { useSelector } from 'react-redux';
import TableauColumn from './TableColumn';
import { uniqueId } from 'lodash';

const Tableau = () => {
  const game = useSelector(({ game }) => game);

  const renderTableColumns = tableauData => {
    return Object.entries(tableauData).map(([tableauColumnId, tableauColumnCards]) => {
      const sourceInfo = {
        sourceId: tableauColumnId,
        sourceType: cells.TABLEAU,
      };

      return (
        <TableauColumn key={uniqueId()} tableauColumnCards={tableauColumnCards} {...sourceInfo} />
      );
    });
  };

  return <S.Tableau>{renderTableColumns(game.tableau)}</S.Tableau>;
};

export default memo(Tableau);
