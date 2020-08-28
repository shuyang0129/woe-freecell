import {
  moveToFoundationCell,
  moveToFreecell,
  resetGame,
  startNewGame,
  undoGameState,
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
  // dispatch(undoGameState());
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
  dispatch(
    moveToFoundationCell({
      targetId: 'CLUB',
      sourceId: 'freecell-1',
      cardId: 'C2',
      sourceType: 'freecells',
    }),
  );

  return <Solitaire />;
};

export default App;
