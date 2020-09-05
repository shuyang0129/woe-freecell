import * as S from './style';
import * as dndType from '@constants/dndType';

import React, { memo, useContext, useEffect } from 'react';
import { checkIsCardDraggable, checkIsCardDragging } from '@utils/freecell';

import { CardContext } from '../../providers/CardContextProvider';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { getSelectingCards } from '../../utils/freecell';
import { useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { moveAutomatically } from '@actions/gameAction';

const Card = ({ cardId, sourceType, sourceId }) => {
  const imgSrc = useContext(CardContext);
  const dispatch = useDispatch();

  const game = useSelector(({ game }) => game);

  const [{ isDragging, dragItem }, drag, preview] = useDrag({
    item: {
      cardId,
      type: dndType.CARD,
      sourceType,
      sourceId,
      dragItems: getSelectingCards(game, { cardId, sourceType, sourceId }),
    },
    canDrag: () => checkIsCardDraggable(game, { cardId, sourceType, sourceId }),
    isDragging: monitor => {
      // 如果drop了，就返回false
      if (monitor.didDrop()) return false;
      return checkIsCardDragging(game, dragItem, { cardId, sourceType, sourceId });
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      dragItem: monitor.getItem(),
    }),
  });

  const handleDoubleCick = () => {
    dispatch(moveAutomatically({ cardId, sourceType, sourceId }));
  };

  useEffect(() => {
    // 拖曳的時候，將拖曳中的卡片消失
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return !!imgSrc[cardId] ? (
    <S.Card
      style={{ opacity: isDragging ? '0' : '1' }}
      src={imgSrc[cardId]}
      alt="poker card"
      ref={drag}
      onDoubleClick={handleDoubleCick}
    />
  ) : null;
};

export default memo(Card);
