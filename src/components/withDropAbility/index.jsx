import * as dndType from '@constants/dndType';

import React from 'react';
import { moveToFreeCell } from '../../actions/gameAction';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

const withDropAbility = Component => props => {
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: dndType.CARD,
    drop: droppedItem => {
      dispatch(
        moveToFreeCell({
          targetId: props.sourceId, // 要到哪個freeCell，拿取props傳進來的sourceId
          cardId: droppedItem.cardId, // 是哪張卡片，取自droppedItem
          sourceId: droppedItem.sourceId, // 來自哪個sourceId，取自droppedItem
          sourceType: droppedItem.sourceType, // 來自哪個sourceType，取自droppedItem
        }),
      );
    },
  });

  return <Component ref={drop} {...props} />;
};

export default withDropAbility;
