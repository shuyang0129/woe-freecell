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
import DraggingCards from './components/DragingCards';
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
        sourceId: 'freeCell-1',
        cardId: 'C2',
        sourceType: 'freeCells',
      }),
    );
    dispatch(
      moveToFreeCell({
        targetId: 'freeCell-1',
        sourceId: 'tableauColumn-6',
        cardId: 'C8',
        sourceType: 'tableau',
      }),
    );
    dispatch(
      moveToTableau({
        targetId: 'tableauColumn-5',
        sourceId: 'tableauColumn-6',
        cardId: 'H11',
        sourceType: 'tableau',
      }),
    );
    dispatch(
      moveToTableau({
        targetId: 'tableauColumn-5',
        sourceId: 'tableauColumn-7',
        cardId: 'C10',
        sourceType: 'tableau',
      }),
    );
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <DraggingCards />
      <Solitaire />
    </DndProvider>
  );
};

export default App;
