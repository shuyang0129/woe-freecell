import styled from 'styled-components';

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

export const PopupContainer = styled.div`
  min-width: 600px;
  height: 330px;
  background: #fcfcfc;
  border-radius: 10px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  padding: 50px;
`;

export const PopupContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  height: 100%;
`;

export const Logo = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
`;

export const Title = styled.h2`
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
  color: #222222;
  text-transform: uppercase;
  font-size: 20px;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  text-align: center;
  letter-spacing: 0.7px;
  color: #333333;
  font-size: 14px;
`;

export const Button = styled.button`
  width: 150px;
  height: 40px;
  background: #222222;
  border-radius: 50px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 1.2px;
  color: #fcfcfc;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-top: auto;

  & > :nth-child(n + 2) {
    margin-left: 15px;
  }
`;

export const CloseButton = styled.button``;
