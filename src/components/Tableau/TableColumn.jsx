import * as S from './style';
import * as dndType from '@constants/dndType';

import React from 'react';
import { moveToTableau } from '../../actions/gameAction';
import { renderCards } from '@utils/renderCard';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

/**
 * @name TableauColumn
 * @param {Object} props
 * @param {Array} props.tableauColumnCards 這個TableauColumn裡面有哪一張卡片
 * @param {String} props.sourceType 這個TableauColumn的sourceType，Ex: tableau
 * @param {String} props.sourceId 這個FreeCell的sourceId，Ex: tableauColumn-0
 * @description TableauColumn的獨立元件，方便使用useDrop這個Hooks，以及拖放的相關處理
 */
const TableauColumn = ({ tableauColumnCards, sourceType, sourceId }) => {
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: dndType.CARD,
    drop: droppedItem => {
      dispatch(
        moveToTableau({
          targetId: sourceId, // 要到哪個freeCell，拿取props傳進來的sourceId
          cardId: droppedItem.cardId, // 是哪張卡片，取自droppedItem
          sourceId: droppedItem.sourceId, // 來自哪個sourceId，取自droppedItem
          sourceType: droppedItem.sourceType, // 來自哪個sourceType，取自droppedItem
        }),
      );
    },
  });
  return (
    <S.TableauColumn ref={drop}>
      {renderCards(tableauColumnCards, { sourceType, sourceId })}
    </S.TableauColumn>
  );
};

export default TableauColumn;
