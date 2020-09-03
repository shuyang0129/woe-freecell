import * as S from './style';
import * as dndType from '@constants/dndType';

import React from 'react';
import { moveToFreeCell } from '../../actions/gameAction';
import { renderCards } from '@utils/renderCard';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

/**
 * @name FreeCell
 * @param {Object} props
 * @param {Array} props.freecellCards 這個FreeCell裡面有哪一張卡片
 * @param {String} props.sourceType 這個FreeCell的sourceType，Ex: freeCells
 * @param {String} props.sourceId 這個FreeCell的sourceId，Ex: freeCell-0
 * @description FreeCell的獨立元件，方便使用useDrop這個Hooks，以及拖放的相關處理
 */
const FreeCell = ({ freecellCards, sourceType, sourceId }) => {
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: dndType.CARD,
    drop: droppedItem => {
      dispatch(
        moveToFreeCell({
          targetId: sourceId, // 要到哪個freeCell，拿取props傳進來的sourceId
          cardId: droppedItem.cardId, // 是哪張卡片，取自droppedItem
          sourceId: droppedItem.sourceId, // 來自哪個sourceId，取自droppedItem
          sourceType: droppedItem.sourceType, // 來自哪個sourceType，取自droppedItem
        }),
      );
    },
  });
  return <S.FreeCell ref={drop}>{renderCards(freecellCards, { sourceType, sourceId })}</S.FreeCell>;
};

export default FreeCell;
