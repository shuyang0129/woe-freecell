import * as S from './style';
import * as dndType from '@constants/dndType';

import React, { memo } from 'react';

import { CardContext } from '../../providers/CardContextProvider';
import { uniqueId } from 'lodash';
import { useContext } from 'react';
import { useDragLayer } from 'react-dnd';

const DraggingCards = () => {
  const imgSrc = useContext(CardContext);

  const { item, itemType, isDragging, currentOffset } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || itemType !== dndType.CARD || !currentOffset) return null;

  const DraggingCards = () => {
    return item.dragItems.map(cardId => (
      <S.Card key={uniqueId()} src={imgSrc[cardId]} alt="dragging card" />
    ));
  };

  return (
    <S.DragginCardsContainer>
      <S.DragginCardsWrapper currentOffset={currentOffset}>
        <DraggingCards />
      </S.DragginCardsWrapper>
    </S.DragginCardsContainer>
  );
};

export default memo(DraggingCards);
