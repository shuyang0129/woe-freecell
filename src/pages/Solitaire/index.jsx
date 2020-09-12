import * as S from './style';

import ControllButtons from '@components/ControllButtons';
import FoundationCells from '@components/FoundationCells';
import FreeCells from '@components/FreeCells';
import GameInfo from '@components/GameInfo';
import Logo from '@components/Logo';
import React, { memo } from 'react';
import Tableau from '@components/Tableau';

import { updateIsHintVisble } from '@actions/playAction';
import { useDispatch, useSelector } from 'react-redux';

function Solitaire() {
  const dispatch = useDispatch();
  const { isHintVisible } = useSelector(state => state.play);

  const handleCloseHintVisible = () => {
    if (isHintVisible) dispatch(updateIsHintVisble());
  };

  return (
    <>
      <S.GameContainer onMouseDown={handleCloseHintVisible}>
        <S.HeaderArea>
          <FreeCells />
          <Logo title="solitaire" />
          <FoundationCells />
        </S.HeaderArea>
        <Tableau />
      </S.GameContainer>
      <S.ControlPanel>
        <GameInfo />
        <ControllButtons />
      </S.ControlPanel>
    </>
  );
}

export default memo(Solitaire);
