import * as S from './style';
import * as dndType from '@constants/dndType';

import React from 'react';
import { moveToFreeCell } from '../../actions/gameAction';
import { renderCards } from '@utils/renderCard';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

const FreeCell = ({ freecellCards, sourceType, sourceId }) => {
  const dispatch = useDispatch();

  const [collectProps, drop] = useDrop({
    accept: dndType.CARD,
    drop: droppedItem => {
      dispatch(
        moveToFreeCell({
          targetId: sourceId,
          sourceId: droppedItem.sourceId,
          cardId: droppedItem.cardId,
          sourceType: droppedItem.sourceType,
        }),
      );
    },
  });
  return <S.FreeCell ref={drop}>{renderCards(freecellCards, { sourceType, sourceId })}</S.FreeCell>;
};

export default FreeCell;
