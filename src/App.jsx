import React, { useEffect } from 'react';
import {
  findPossibleMove,
  moveToFoundationCell,
  moveToFreeCell,
  moveToTableau,
  restartGame,
  startNewGame,
  undoGameState,
} from './actions/gameAction';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Solitaire from '@pages/Solitaire';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startNewGame(1));
    dispatch(
      moveToFreeCell({
        targetId: 'freeCell-0',
        sourceId: 'tableauColumn-5',
        cardId: 'D3',
        sourceType: 'tableau',
      }),
    );
    dispatch(
      moveToFreeCell({
        targetId: 'freeCell-1',
        sourceId: 'tableauColumn-5',
        cardId: 'C2',
        sourceType: 'tableau',
      }),
    );
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Solitaire />
    </DndProvider>
  );
};

export default App;
