import * as S from './style';
import * as dndType from '@constants/dndType';

import React, { memo, useEffect, useContext } from 'react';
import { checkIsCardDraggable, checkIsCardDragging } from '@utils/freecell';
import { CardContext } from '../../providers/CardContextProvider';

import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { getEmptyImage } from 'react-dnd-html5-backend';

const Card = ({ cardId, sourceType, sourceId }) => {
  const imgSrc = useContext(CardContext);

  const game = useSelector(({ game }) => game);

  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      cardId,
      type: dndType.CARD,
      sourceType,
      sourceId,
    },
    canDrag: () => checkIsCardDraggable(game, { cardId, sourceType, sourceId }),
    isDragging: () => checkIsCardDragging(game, { cardId, sourceType, sourceId }),
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return !!imgSrc[cardId] ? (
    <S.Card
      style={{ opacity: isDragging ? '0' : '100%' }}
      src={imgSrc[cardId]}
      alt="poker card"
      ref={drag}
    />
  ) : null;
};

export default memo(Card);
