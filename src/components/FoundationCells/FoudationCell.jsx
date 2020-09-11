import * as S from './style';

import React from 'react';
import { renderCards } from '@utils/renderCard';
import withDropAbility from '@components/withDropAbility';
import withHintForCell from '@components/withHintForCell';

/**
 * @name FoundationCell
 * @param {Object} props
 * @param {Array} props.foundationCellCards 這個FoundationCell裡面有哪一張卡片
 * @param {String} props.sourceType 這個FoundationCell的sourceType，Ex: foundationCells
 * @param {String} props.sourceId 這個FoundationCell的sourceId，Ex: CLUB
 * @description FoudationCell的獨立元件，方便使用useDrop這個Hooks，以及拖放的相關處理
 */
const FoundationCell = React.forwardRef(
  ({ foundationCellCards, sourceType, sourceId, isShowHint, isCellEmpty }, ref) => {
    return (
      <S.FoundationCell suit={sourceId} isShowHint={isShowHint} isCellEmpty={isCellEmpty} ref={ref}>
        {renderCards(foundationCellCards, { sourceType, sourceId })}
      </S.FoundationCell>
    );
  },
);

export default withHintForCell(withDropAbility(FoundationCell));
