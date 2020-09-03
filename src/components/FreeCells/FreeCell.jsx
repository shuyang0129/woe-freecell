import { renderCards } from '@utils/renderCard';
import React from 'react';
import withDropAbility from '@components/withDropAbility';

import * as S from './style';

/**
 * @name FreeCell
 * @param {Object} props
 * @param {Array} props.freecellCards 這個FreeCell裡面有哪一張卡片
 * @param {String} props.sourceType 這個FreeCell的sourceType，Ex: freeCells
 * @param {String} props.sourceId 這個FreeCell的sourceId，Ex: freeCell-0
 * @description FreeCell的獨立元件，方便使用useDrop這個Hooks，以及拖放的相關處理
 */

const FreeCell = React.forwardRef(({ freecellCards, sourceType, sourceId }, ref) => {
  return <S.FreeCell ref={ref}>{renderCards(freecellCards, { sourceType, sourceId })}</S.FreeCell>;
});

export default withDropAbility(FreeCell);
