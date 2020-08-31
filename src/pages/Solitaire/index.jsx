import * as S from './style';

import ControllButtons from '@components/ControllButtons';
import FoundationCells from '@components/FoundationCells';
import FreeCells from '@components/FreeCells';
import GameInfo from '@components/GameInfo';
import Logo from '@components/Logo';
import React, { memo } from 'react';
import Tableau from '@components/Tableau';

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

export default memo(Solitaire);
