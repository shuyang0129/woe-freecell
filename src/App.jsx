import React from 'react';
import Solitaire from '@pages/Solitaire';
import { useDispatch } from 'react-redux';
import {
  startNewGame,
  moveToFreecell,
  resetGame,
  undoGameState,
} from './actions/gameAction';

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
  dispatch(undoGameState());

  return <Solitaire />;
};

export default App;
