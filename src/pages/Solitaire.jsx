import ControllButtons from '@components/ControllButtons';
import FoundationCells from '@components/FoundationCells';
import FreeCells from '@components/FreeCells';
import GameInfo from '@components/GameInfo';
import Logo from '@components/Logo';
import React from 'react';
import styled from 'styled-components';
import Tableau from '@components/Tableau';

const GameContainer = styled.div`
  align-items: center;
  background-color: #e2e2e2;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
  width: 100%;
`;

const HeaderArea = styled.header`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 50px;
  padding: 0 20px;
  width: 100%;
`;

const ControlPanel = styled.footer`
  align-items: center;
  background: #e2e2e2;
  border-top: 1px solid #ccc;
  bottom: 0;
  display: flex;
  flex-flow: row nowrap;
  flex: 0 0 auto;
  max-width: 1200px;
  padding: 20px;
  position: fixed;
  width: 100%;
`;

function Solitaire() {
  return (
    <GameContainer>
      <HeaderArea>
        <FreeCells />
        <Logo title="solitaire" />
        <FoundationCells />
      </HeaderArea>
      <Tableau />
      <ControlPanel>
        <GameInfo />
        <ControllButtons />
      </ControlPanel>
    </GameContainer>
  );
}

export default Solitaire;
