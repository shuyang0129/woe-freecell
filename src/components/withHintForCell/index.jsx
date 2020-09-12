import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const withHintForCell = Component => props => {
  const [isShowHint, setIsShowHint] = useState(false);
  const [isCellEmpty, setIsCellEmpty] = useState(true);
  const { play, game } = useSelector(state => state);

  useEffect(() => {
    setIsShowHint(false);

    const { sourceType, sourceId } = props;
    // 如果 possibleMove 為 null，不做任何事
    if (!play.possibleMove) return;
    // 如果不是 possibleMove 中描述的targetId
    if (play.possibleMove.targetId === sourceId && play.possibleMove.targetType === sourceType) {
      setIsShowHint(true);
      if (game[sourceType][sourceId].length) setIsCellEmpty(false);
    }
  }, [game, play.possibleMove, props]);

  return <Component {...props} isShowHint={isShowHint} isCellEmpty={isCellEmpty} />;
};

export default withHintForCell;
