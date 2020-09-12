import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const withHintForCell = Component => props => {
  const [isShowHint, setIsShowHint] = useState(false);
  const [isCellEmpty, setIsCellEmpty] = useState(true);
  const { play, game } = useSelector(state => state);

  useEffect(() => {
    // 如果Redux關閉hint顯示，不顯示
    if (!play.isHintVisible) return setIsShowHint(false);

    // 初始化
    setIsShowHint(false);
    // 從props取出sourceType以及sourceId
    const { sourceType, sourceId } = props;
    // 如果 possibleMove 為 null，不做任何事
    if (!play.possibleMove) return;
    // 如果不是 possibleMove 中描述的targetId
    if (play.possibleMove.targetId === sourceId && play.possibleMove.targetType === sourceType) {
      setIsShowHint(true);
      if (game[sourceType][sourceId].length) setIsCellEmpty(false);
    }
  }, [game, play.possibleMove, play.isHintVisible, props]);

  return <Component {...props} isShowHint={isShowHint} isCellEmpty={isCellEmpty} />;
};

export default withHintForCell;
