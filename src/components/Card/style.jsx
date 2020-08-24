import styled, { keyframes } from 'styled-components';

const move = keyframes`
  /* from {
    transform: translate(-300px, -300px);
  } */
`;

export const Card = styled.img`
  position: relative;
  display: block;
  border-radius: 5px;
  height: 145px;
  width: 95px;
  /* animation: ${move} 0.3s ease-in-out 1 both; */
  z-index: 2;

  &:nth-child(n + 2) {
    animation-delay: 0.2s;
  }
`;
