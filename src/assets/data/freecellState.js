import * as suit from '@constants/suits';

export const defaultGameState = {
  freecells: {
    'freecell-0': [],
    'freecell-1': [],
    'freecell-2': [],
    'freecell-3': [],
  },
  foundationCells: {
    [suit.CLUB]: [],
    [suit.DIAMOND]: [],
    [suit.HEART]: [],
    [suit.SPADE]: [],
  },
  tableau: {
    'tableauColumn-0': [],
    'tableauColumn-1': [],
    'tableauColumn-2': [],
    'tableauColumn-3': [],
    'tableauColumn-4': [],
    'tableauColumn-5': [],
    'tableauColumn-6': [],
    'tableauColumn-7': [],
  },
};

export const defaultPlayState = {
  moves: 0,
  gameCode: 0,
  historyMoves: [],
  draggingCards: [],
  isGameStarted: false,
};
