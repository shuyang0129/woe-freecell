import { startNewGame, restartGame, undoGameState } from '@actions/gameAction';
import { useDispatch } from 'react-redux';
import React, { memo } from 'react';

import * as S from './style';

const ControllButtons = () => {
  const dispatch = useDispatch();

  const handleNewGame = () => {
    dispatch(startNewGame());
  };

  const handleResetGame = () => {
    dispatch(restartGame());
  };

  const handleUndo = () => {
    dispatch(undoGameState());
  };

  return (
    <S.ControllButtons>
      <S.ControllButton onClick={handleNewGame}>NEW GAME</S.ControllButton>
      <S.ControllButton onClick={handleResetGame}>RESTART</S.ControllButton>
      <S.ControllButton>HINT</S.ControllButton>
      <S.ControllButton onClick={handleUndo}>UNDO</S.ControllButton>
    </S.ControllButtons>
  );
};

export default memo(ControllButtons);
