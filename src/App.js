import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column nowrap;
  align-items: center;
  background-color: #e2e2e2;
`;

const HeaderArea = styled.header`
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  align-items: center;
  background: green;
`;

const MainArea = styled.main`
  flex: 1 1 0;
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  align-items: center;
  background: yellowgreen;
`;

const FooterArea = styled.footer`
  flex: 0 0 auto;
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  align-items: center;
  background: pink;
`;

function App() {
  return (
    <Container>
      <HeaderArea>Header</HeaderArea>
      <MainArea>Main</MainArea>
      <FooterArea>Footer</FooterArea>
    </Container>
  );
}

export default App;
