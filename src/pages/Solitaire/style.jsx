import styled from 'styled-components';

export const GameContainer = styled.div`
  align-items: center;
  background-color: #e2e2e2;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  left: 50%;
  margin: 0 auto;
  max-width: 1200px;
  min-width: 1054px;
  padding: 0 20px;
  position: fixed;
  top: 0;
  transform: translateX(-50%);
  width: 100%;
  overflow-y: scroll;
`;

export const HeaderArea = styled.header`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 50px;
  padding: 0 20px;
  width: 100%;
`;

export const ControlPanel = styled.footer`
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
  z-index: 3;
`;
