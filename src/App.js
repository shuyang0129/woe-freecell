import React from 'react';
import styled from 'styled-components';

import King from '@/assets/img/king_happy.png';
import InfoSvg from '@/assets/img/info.svg';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  flex-flow: column nowrap;
  align-items: center;
  background-color: #e2e2e2;
  padding: 0 20px;
  margin: 0 auto;
`;

const HeaderArea = styled.header`
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 30px;
  padding: 0 20px;
`;

const MainArea = styled.main`
  flex: 1 1 0;
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  align-items: center;
  /* background: yellowgreen; */
`;

const FooterArea = styled.footer`
  position: fixed;
  bottom: 0;
  flex: 0 0 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background: #e2e2e2;
  border-top: 1px solid #ccc;
`;

const FreeCells = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const FreeCell = styled.div`
  width: 95px;
  height: 145px;
  border: 2px solid #fcfcfc;
  border-radius: 5px;
  opacity: 0.6;
  margin-right: 15px;

  &::last-child {
    margin-right: 0;
  }
`;

const Logo = styled.div`
  max-width: 74px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 0 23px;

  & > img {
    width: 100%;
    height: auto;
    margin-bottom: 8px;
  }

  & > figcaption {
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 1.4px;
    color: #222;
  }
`;

const FoundationCells = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const FoundationCell = styled.div`
  width: 95px;
  height: 145px;
  background: #fcfcfc;
  border: 2px solid #fcfcfc;
  border-radius: 5px;
  opacity: 0.6;
  margin-right: 15px;

  &::last-child {
    margin-right: 0;
  }
`;

const ControllButton = styled.button`
  padding: 12px 24px;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1.2px;
  color: #fff;
  text-align: center;
  background: #222;
  border-radius: 50px;
`;

const ControllButtons = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  ${ControllButton} {
    margin-right: 15px;
    &::last-child {
      margin-right: 0;
    }
  }
`;

const GameInfo = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-right: auto;
  padding: 0 15px;

  span {
    font-size: 14px;
    line-height: 17px;
    font-weight: bold;
    letter-spacing: 1.4px;
    color: #222;
    margin-right: 20px;

    &::last-child {
      margin-right: 0;
    }
  }
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #000;
  border-radius: 50%;
  margin-right: 20px;

  & > img {
    width: 20px;
    height: 20px;
  }
`;

function App() {
  return (
    <Container>
      <HeaderArea>
        <FreeCells>
          <FreeCell />
          <FreeCell />
          <FreeCell />
          <FreeCell />
        </FreeCells>
        <Logo>
          <img src={King} alt="King logo" />
          <figcaption>FREECELL</figcaption>
        </Logo>
        <FoundationCells>
          <FoundationCell />
          <FoundationCell />
          <FoundationCell />
          <FoundationCell />
        </FoundationCells>
      </HeaderArea>
      <MainArea>Main</MainArea>
      <FooterArea>
        <GameInfo>
          <InfoIcon>
            <img src={InfoSvg} alt="Info icon" />
          </InfoIcon>
          <span>TIME: 00:00</span>
          <span>SCORE: 0</span>
        </GameInfo>
        <ControllButtons>
          <ControllButton>NEW GAME</ControllButton>
          <ControllButton>RESTART</ControllButton>
          <ControllButton>HINT</ControllButton>
          <ControllButton>UNDO</ControllButton>
        </ControllButtons>
      </FooterArea>
    </Container>
  );
}

export default App;
