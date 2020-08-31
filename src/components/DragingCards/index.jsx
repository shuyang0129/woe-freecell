import * as dndType from '@constants/dndType';

import React, { useEffect, useState } from 'react';

import { getSelectingCards } from '@/utils/freecell';
import { renderCards } from '@utils/renderCard';
import styled from 'styled-components';
import { useDragLayer } from 'react-dnd';
import { useSelector } from 'react-redux';

const DragginCards = styled.div.attrs(({ initialOffset, currentOffset }) => {
  let { x, y } = currentOffset;
  return {
    style: {
      display: (!initialOffset || !currentOffset) && 'none',
      transform: `translate(${x}px, ${y}px)`,
    },
  };
})`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  & > :nth-child(n + 2) {
    box-shadow: 0 -0.5px rgba(186, 186, 186, 0.2);
    margin-top: -120px;
  }
`;

const DraggingCards = () => {
  const game = useSelector(({ game }) => game);
  const [draggingCards, setDraggingCards] = useState([]);

  const { item, itemType, isDragging, initialOffset, currentOffset } = useDragLayer(monitor => {
    return {
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    };
  });

  useEffect(() => {
    if (!!item) {
      const { cardId, sourceType, sourceId } = item;
      const draggingCards = getSelectingCards(game, { cardId, sourceType, sourceId });
      setDraggingCards(draggingCards);
    }
  }, [item]);

  useEffect(() => {
    const absortController = new AbortController();
    const signal = absortController.signal;

    return () => absortController.abort();
  }, []);

  if (!isDragging || !item || itemType !== dndType.CARD) return null;

  return (
    <DragginCards initialOffset={initialOffset} currentOffset={currentOffset}>
      {renderCards(draggingCards, { sourceType: item.sourceType, sourceId: item.sourceId })}
    </DragginCards>
  );
};

export default DraggingCards;
