import React from 'react';
import Solitaire from '@pages/Solitaire';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  dispatch({ type: 'INIT' });
  // dispatch({ type: 'NEW_GAME', payload: { gameCode: 1 } });
  dispatch({ type: 'NEW_GAME', payload: { gameCode: 1 } });

  return <Solitaire />;
};

export default App;
