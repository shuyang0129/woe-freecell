import * as S from './style';
import * as dndType from '@constants/dndType';

import React, { useEffect, useState, memo } from 'react';

import { getSelectingCards } from '@/utils/freecell';
import { renderCards } from '@utils/renderCard';
import { useDragLayer } from 'react-dnd';
import { useSelector } from 'react-redux';

const DraggingCards = () => {
  const game = useSelector(({ game }) => game);
  // const [draggingCards, setDraggingCards] = useState([]);

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
    console.log('isDragging', item);
  }, [item]);

  // useEffect(() => {
  //   if (!!item) {
  //     const { cardId, sourceType, sourceId } = item;
  //     const draggingCards = getSelectingCards(game, { cardId, sourceType, sourceId });
  //     setDraggingCards(draggingCards);
  //   }
  // }, [item]);

  // useEffect(() => {
  //   const absortController = new AbortController();
  //   const signal = absortController.signal;
  //   console.log('signal', signal);

  //   return () => absortController.abort();
  // }, []);

  if (!isDragging || !item || itemType !== dndType.CARD) return null;

  return (
    <h3>Hello</h3>
    // <S.DragginCards>
    //   {renderCards(['C1', 'C2'], { sourceType: item.sourceType, sourceId: item.sourceId })}
    // </S.DragginCards>
  );
};

export default memo(DraggingCards);
//initialOffset={initialOffset} currentOffset={currentOffset}
