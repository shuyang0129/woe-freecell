import * as suit from '@constants/suits';

export const freecellDataDefault = {
  freecells: {
    0: null,
    1: null,
    2: null,
    3: null,
  },
  foundationCells: {
    [suit.CLUB]: [],
    [suit.DIAMOND]: [],
    [suit.HEART]: [],
    [suit.SPADE]: [],
  },
  tableau: {
    ['tableauColumn-0']: [],
    ['tableauColumn-1']: [],
    ['tableauColumn-2']: [],
    ['tableauColumn-3']: [],
    ['tableauColumn-4']: [],
    ['tableauColumn-5']: [],
    ['tableauColumn-6']: [],
    ['tableauColumn-7']: [],
  },
};
