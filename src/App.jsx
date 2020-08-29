import {
  moveToFoundationCell,
  moveToFreecell,
  restartGame,
  startNewGame,
  undoGameState,
  moveToTableau,
  findPossibleMove,
} from './actions/gameAction';

import React from 'react';
import Solitaire from '@pages/Solitaire';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  dispatch(startNewGame(1));
  dispatch(
    moveToFreecell({
      targetId: 'freecell-0',
      sourceId: 'tableauColumn-5',
      cardId: 'D3',
      sourceType: 'tableau',
    }),
  );
  dispatch(
    moveToFreecell({
      targetId: 'freecell-1',
      sourceId: 'tableauColumn-5',
      cardId: 'C2',
      sourceType: 'tableau',
    }),
  );
  dispatch(
    moveToFoundationCell({
      targetId: 'CLUB',
      sourceId: 'tableauColumn-5',
      cardId: 'C1',
      sourceType: 'tableau',
    }),
  );
  dispatch(
    moveToFoundationCell({
      targetId: 'SPADE',
      sourceId: 'tableauColumn-5',
      cardId: 'S1',
      sourceType: 'tableau',
    }),
  );
  // dispatch(
  //   moveToFoundationCell({
  //     targetId: 'CLUB',
  //     sourceId: 'freecell-1',
  //     cardId: 'C2',
  //     sourceType: 'freecells',
  //   }),
  // );
  // dispatch(
  //   moveToFreecell({
  //     targetId: 'freecell-2',
  //     sourceId: 'tableauColumn-6',
  //     cardId: 'C8',
  //     sourceType: 'tableau',
  //   }),
  // );
  dispatch(
    moveToFreecell({
      targetId: 'freecell-2',
      sourceId: 'tableauColumn-5',
      cardId: 'C12',
      sourceType: 'tableau',
    }),
  );
  // dispatch(
  //   moveToFreecell({
  //     targetId: 'freecell-3',
  //     sourceId: 'tableauColumn-5',
  //     cardId: 'H7',
  //     sourceType: 'tableau',
  //   }),
  // );
  // dispatch(
  //   moveToFreecell({
  //     targetId: 'freecell-2',
  //     sourceId: 'tableauColumn-6',
  //     cardId: 'C8',
  //     sourceType: 'tableau',
  //   }),
  // );
  // dispatch(
  //   moveToTableau({
  //     targetId: 'tableauColumn-6',
  //     sourceId: 'tableauColumn-7',
  //     cardId: 'C10',
  //     sourceType: 'tableau',
  //   }),
  // );
  // dispatch(
  //   moveToTableau({
  //     targetId: 'tableauColumn-5',
  //     sourceId: 'tableauColumn-6',
  //     cardId: 'H11',
  //     sourceType: 'tableau',
  //   }),
  // );
  // dispatch(undoGameState());
  // dispatch(restartGame());
  // dispatch(findPossibleMove());

  return <Solitaire />;
};

export default App;
