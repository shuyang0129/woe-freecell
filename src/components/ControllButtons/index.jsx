import * as S from './style';

import React from 'react';
import { useDispatch } from 'react-redux';

const ControllButtons = () => {
  const dispatch = useDispatch();

  const handleNewGame = () => {
    dispatch({ type: 'NEW_GAME' });
  };

  return (
    <S.ControllButtons>
      <S.ControllButton onClick={handleNewGame}>NEW GAME</S.ControllButton>
      <S.ControllButton>RESTART</S.ControllButton>
      <S.ControllButton>HINT</S.ControllButton>
      <S.ControllButton>UNDO</S.ControllButton>
    </S.ControllButtons>
  );
};

export default ControllButtons;
