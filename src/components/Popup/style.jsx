import styled from 'styled-components';

export const PopupOverlay = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
`;

export const PopupContainer = styled.div`
  align-items: center;
  background: #fcfcfc;
  border-radius: 10px;
  display: flex;
  flex-flow: column nowrap;
  height: 330px;
  justify-content: center;
  min-width: 600px;
  padding: 50px;
  position: relative;
`;

export const PopupContent = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`;

export const Logo = styled.img`
  height: 60px;
  margin-bottom: 15px;
  width: 60px;
`;

export const Title = styled.h2`
  color: #222222;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 20px;
  text-align: center;
  text-transform: uppercase;
`;

export const Description = styled.p`
  color: #333333;
  font-size: 14px;
  letter-spacing: 0.7px;
  text-align: center;
`;

export const Button = styled.button`
  align-items: center;
  background: #222222;
  border-radius: 50px;
  color: #fcfcfc;
  display: flex;
  flex-flow: row nowrap;
  font-size: 12px;
  font-weight: bold;
  height: 40px;
  justify-content: center;
  letter-spacing: 1.2px;
  text-align: center;
  width: 150px;
`;

export const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin-top: auto;
  & > :nth-child(n + 2) {
    margin-left: 15px;
  }
`;

export const CloseButton = styled.button`
  height: 20px;
  position: absolute;
  right: 30px;
  top: 30px;
  width: 20px;
`;
