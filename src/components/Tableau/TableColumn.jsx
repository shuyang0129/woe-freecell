import * as S from './style';

import React from 'react';
import { renderCards } from '@utils/renderCard';
import withDropAbility from '@components/withDropAbility';
import withHintForCell from '@components/withHintForCell';

/**
 * @name TableauColumn
 * @param {Object} props
 * @param {Array} props.tableauColumnCards 這個TableauColumn裡面有哪一張卡片
 * @param {String} props.sourceType 這個TableauColumn的sourceType，Ex: tableau
 * @param {String} props.sourceId 這個FreeCell的sourceId，Ex: tableauColumn-0
 * @description TableauColumn的獨立元件，方便使用useDrop這個Hooks，以及拖放的相關處理
 */
const TableauColumn = React.forwardRef(
  ({ tableauColumnCards, sourceType, sourceId, isShowHint, isCellEmpty }, ref) => {
    return (
      <S.TableauColumn isShowHint={isShowHint} isCellEmpty={isCellEmpty} ref={ref}>
        {renderCards(tableauColumnCards, { sourceType, sourceId })}
      </S.TableauColumn>
    );
  },
);

export default withHintForCell(withDropAbility(TableauColumn));
