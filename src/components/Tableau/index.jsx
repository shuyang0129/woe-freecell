import * as S from './style';

import React from 'react';
import { renderCards } from '@utils/renderCard';
import { useSelector } from 'react-redux';

const Tableau = () => {
  const tableauData = useSelector(({ game }) => game.tableau);

  const renderTableColumns = tableauData => {
    console.log('renderTableColumns -> tableauData', tableauData);
    return Object.entries(tableauData).map(
      ([tableauColumnId, tableauColumnData]) => {
        return (
          <S.TableauColumn key={tableauColumnId}>
            {renderCards(tableauColumnData)}
          </S.TableauColumn>
        );
      },
    );
  };

  return (
    <S.Tableau>
      {renderTableColumns(tableauData)}
      {/* <S.TableauColumn>
        <Card name="C1" />
        <Card name="C1" />
      </S.TableauColumn>
      <S.TableauColumn />
      <S.TableauColumn />
      <S.TableauColumn />
      <S.TableauColumn />
      <S.TableauColumn />
      <S.TableauColumn />
      <S.TableauColumn /> */}
    </S.Tableau>
  );
};

export default Tableau;
