import * as S from './style';
import * as dndType from '@constants/dndType';

import React, { memo, useEffect, useState } from 'react';

import Card from '@components/Card';
import { getSelectingCards } from '@/utils/freecell';
import { renderCards } from '@utils/renderCard';
import { uniqueId } from 'lodash';
import { useDragLayer } from 'react-dnd';
import { useSelector } from 'react-redux';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

const getItemStyles = (initialOffset, currentOffset) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

const DraggingCards = () => {
  const [isRender, setIsRender] = useState(true);
  const { item, itemType, isDragging, initialOffset, currentOffset } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  // useEffect(() => {
  //   if (!!item) console.log(item);
  // }, [item]);

  if (!isDragging || itemType !== dndType.CARD) return null;

  return (
    // <h3>Hello</h3>
    <div style={layerStyles}>
      {/* <S.DragginCards style={getItemStyles(initialOffset, currentOffset)}> */}
      <S.DragginCards initialOffset={initialOffset} currentOffset={currentOffset}>
        {/* {isRendered && item.dragItems.map(cardId => <Card key={uniqueId()} cardId={cardId} />)} */}
        {!!item.dragItems && isRender && renderCards(['C1', 'H2'])}
      </S.DragginCards>
    </div>
  );
};

export default memo(DraggingCards);
//initialOffset={initialOffset} currentOffset={currentOffset}
