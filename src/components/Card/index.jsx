import * as S from './style';
import * as dndType from '@constants/dndType';

import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { checkIsCardDraggable, checkIsCardDragging } from '@utils/freecell';

import { CardContext } from '../../providers/CardContextProvider';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { getSelectingCards } from '../../utils/freecell';
import { useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { moveAutomatically } from '@actions/gameAction';

const Card = ({ cardId, sourceType, sourceId }) => {
  const [isShowHint, setIsShowHint] = useState(false);

  const imgSrc = useContext(CardContext);
  const dispatch = useDispatch();

  const { game, play, locations } = useSelector(state => state);

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

  // 邏輯判斷 isShowHint
  useEffect(() => {
    // 沒有possibleMove，不做任何事
    if (!play.possibleMove) return;

    // 如果不是同一個sourceId，不做任何事
    if (play.possibleMove.sourceId !== sourceId) return;

    // 取出當前Cell裡面所有牌
    const cardsInCell = game[sourceType][sourceId];
    // 找到possibleMove中cardId在當前Cell的index
    const indexOfCardIdInPossibleMove = cardsInCell.indexOf(play.possibleMove.cardId);

    // 如果找不到這張牌，不做任何事
    if (indexOfCardIdInPossibleMove === -1) return;

    // 根據index，slice該牌之下的其他牌組
    const lastValidSequenceInCell = cardsInCell.slice(indexOfCardIdInPossibleMove);

    // 如果目前的cardId包含在lastValidSequenceInCell中，isShowHint設為true
    if (lastValidSequenceInCell.includes(cardId)) setIsShowHint(true);
  }, [cardId, game, play.possibleMove, sourceId, sourceType]);

  return !!imgSrc[cardId] ? (
    <S.Card
      style={{ opacity: isDragging ? '0' : '1' }}
      isGameStarted={play.isGameStarted}
      location={locations && locations[cardId]}
      isShowHint={isShowHint}
      src={imgSrc[cardId]}
      alt="poker card"
      ref={drag}
      onDoubleClick={handleDoubleCick}
    />
  ) : null;
};

export default memo(Card);
