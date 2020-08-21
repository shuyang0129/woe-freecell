import ControllButtons from '@components/ControllButtons';
import FoundationCells from '@components/FoundationCells';
import FreeCells from '@components/FreeCells';
import GameInfo from '@components/GameInfo';
import Logo from '@components/Logo';
import React from 'react';
import Tableau from '@components/Tableau';

import * as S from './style';

function Solitaire() {
  return (
    <S.GameContainer>
      <S.HeaderArea>
        <FreeCells />
        <Logo title="solitaire" />
        <FoundationCells />
      </S.HeaderArea>
      <Tableau />
      <S.ControlPanel>
        <GameInfo />
        <ControllButtons />
      </S.ControlPanel>
    </S.GameContainer>
  );
}

export default Solitaire;
