import * as S from './style';

import React, { useState, useEffect } from 'react';
import { renderCards } from '@utils/renderCard';
import withDropAbility from '@components/withDropAbility';
import { useSelector } from 'react-redux';

/**
 * @name FoundationCell
 * @param {Object} props
 * @param {Array} props.foundationCellCards 這個FoundationCell裡面有哪一張卡片
 * @param {String} props.sourceType 這個FoundationCell的sourceType，Ex: foundationCells
 * @param {String} props.sourceId 這個FoundationCell的sourceId，Ex: CLUB
 * @description FoudationCell的獨立元件，方便使用useDrop這個Hooks，以及拖放的相關處理
 */
const FoundationCell = React.forwardRef(({ foundationCellCards, sourceType, sourceId }, ref) => {
  const [isShowHint, setIsShowHint] = useState(false);
  const [isCellEmpty, setIsCellEmpty] = useState(true);
  const { play, game } = useSelector(state => state);

  useEffect(() => {
    // 如果 possibleMove 為 null，不做任何事
    if (!play.possibleMove) return;
    // 如果不是 possibleMove 中描述的targetId
    if (play.possibleMove.targetId === sourceId && play.possibleMove.targetType === sourceType) {
      setIsShowHint(true);
      if (game[sourceType][sourceId].length) setIsCellEmpty(false);
    }
  }, [game, play.possibleMove, sourceId, sourceType]);

  return (
    <S.FoundationCell suit={sourceId} isShowHint={isShowHint} isCellEmpty={isCellEmpty} ref={ref}>
      {renderCards(foundationCellCards, { sourceType, sourceId })}
    </S.FoundationCell>
  );
});

export default withDropAbility(FoundationCell);
