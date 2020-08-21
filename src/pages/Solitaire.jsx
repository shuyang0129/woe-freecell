import ControllButtons from '@components/ControllButtons';
import FoundationCells from '@components/FoundationCells';
import FreeCells from '@components/FreeCells';
import GameInfo from '@components/GameInfo';
import Logo from '@components/Logo';
import Card from '@components/Card';
import React from 'react';
import styled from 'styled-components';

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

const Tableau = styled.main`
  align-items: flex-start;
  display: flex;
  flex-flow: row nowrap;
  flex: 1 1 0;
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
  /* background: yellowgreen;
	*/
`;

const TableauColumn = styled.div`
  height: 100%;
  position: relative;
  width: 95px;

  & > :nth-child(n + 2) {
    margin-top: -120px;
    box-shadow: 0 -0.5px rgba(186, 186, 186, 0.2);
  }

  &::before {
    background: #fcfcfc;
    border-radius: 5px;
    content: '';
    display: block;
    height: 145px;
    opacity: 0.2;
    position: absolute;
    top: 0;
    width: 95px;
  }
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
      <Tableau>
        <TableauColumn>
          <Card name="C1" />
          <Card name="C1" />
          <Card name="C1" />
        </TableauColumn>
        <TableauColumn />
        <TableauColumn />
        <TableauColumn />
        <TableauColumn />
        <TableauColumn />
        <TableauColumn />
        <TableauColumn />
      </Tableau>
      <ControlPanel>
        <GameInfo />
        <ControllButtons />
      </ControlPanel>
    </GameContainer>
  );
}

export default Solitaire;
