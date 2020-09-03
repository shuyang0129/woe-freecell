import * as dndType from '@constants/dndType';

import React from 'react';
import { moveToFreeCell, moveToFoundationCell, moveToTableau } from '../../actions/gameAction';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import * as cells from '@constants/cells';

const withDropAbility = Component => props => {
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: dndType.CARD,
    drop: droppedItem => {
      const params = {
        targetId: props.sourceId, // 要到哪個freeCell，拿取props傳進來的sourceId
        cardId: droppedItem.cardId, // 是哪張卡片，取自droppedItem
        sourceId: droppedItem.sourceId, // 來自哪個sourceId，取自droppedItem
        sourceType: droppedItem.sourceType, // 來自哪個sourceType，取自droppedItem
      };

      switch (props.sourceType) {
        case cells.FREE_CELLS:
          return dispatch(moveToFreeCell(params));
        case cells.FOUNDATION_CELLS:
          return dispatch(moveToFoundationCell(params));
        case cells.TABLEAU:
          return dispatch(moveToTableau(params));
        default:
          return;
      }
    },
  });

  return <Component ref={drop} {...props} />;
};

export default withDropAbility;
