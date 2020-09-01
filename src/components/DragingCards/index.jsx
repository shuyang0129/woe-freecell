import * as S from './style';
import * as dndType from '@constants/dndType';

import React, { memo } from 'react';

import { CardContext } from '../../providers/CardContextProvider';
import { Card as StyledCard } from '@components/Card/style';
import { uniqueId } from 'lodash';
import { useContext } from 'react';
import { useDragLayer } from 'react-dnd';

const DraggingCards = () => {
  const imgSrc = useContext(CardContext);

  const { item, itemType, isDragging, initialOffset, currentOffset } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || itemType !== dndType.CARD) return null;

  return (
    <S.DragginerLayerContainer>
      <S.DragginCards initialOffset={initialOffset} currentOffset={currentOffset}>
        {item.dragItems.map(cardId => (
          <StyledCard key={uniqueId()} src={imgSrc[cardId]} alt="poker card" />
        ))}
      </S.DragginCards>
    </S.DragginerLayerContainer>
  );
};

export default memo(DraggingCards);
