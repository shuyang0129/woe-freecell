import React, { useEffect } from 'react';
import { startNewGame, updateGameState } from '@actions/gameAction';
import { updatePlay } from '@actions/playAction';
import { SOLITAIRE } from '@constants/sessionStorage';

import CardContextProvider from './providers/CardContextProvider';
import { DndProvider } from 'react-dnd';
import DraggingCards from './components/DragingCards';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Solitaire from '@pages/Solitaire';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const gameStorage = JSON.parse(sessionStorage.getItem(SOLITAIRE));

    if (!gameStorage) return dispatch(startNewGame());

    const { game: gameState, play: playState } = gameStorage;
    dispatch(updateGameState(gameState, false));
    dispatch(updatePlay(playState, false));
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <CardContextProvider>
        <DraggingCards />
        <Solitaire />
      </CardContextProvider>
    </DndProvider>
  );
};

export default App;
