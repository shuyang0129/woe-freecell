import * as S from './style';
import * as dndType from '@constants/dndType';

import React from 'react';
import { moveToFoundationCell } from '../../actions/gameAction';
import { renderCards } from '@utils/renderCard';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

/**
 * @name FoundationCell
 * @param {Object} props
 * @param {Array} props.foundationCellCards 這個FoundationCell裡面有哪一張卡片
 * @param {String} props.sourceType 這個FoundationCell的sourceType，Ex: foundationCells
 * @param {String} props.sourceId 這個FoundationCell的sourceId，Ex: CLUB
 * @description FoudationCell的獨立元件，方便使用useDrop這個Hooks，以及拖放的相關處理
 */
const FoundationCell = ({ foundationCellCards, sourceType, sourceId }) => {
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: dndType.CARD,
    drop: droppedItem => {
      dispatch(
        moveToFoundationCell({
          targetId: sourceId, // 要到哪個foundationCell，拿取props傳進來的sourceId
          cardId: droppedItem.cardId, // 是哪張卡片，取自droppedItem
          sourceId: droppedItem.sourceId, // 來自哪個sourceId，取自droppedItem
          sourceType: droppedItem.sourceType, // 來自哪個sourceType，取自droppedItem
        }),
      );
    },
  });
  return (
    <S.FoundationCell suit={sourceId} ref={drop}>
      {renderCards(foundationCellCards, { sourceType, sourceId })}
    </S.FoundationCell>
  );
};

export default FoundationCell;
