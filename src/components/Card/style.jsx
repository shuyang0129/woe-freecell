import styled, { keyframes } from 'styled-components';

const move = keyframes`
  from {
    transform: translate(-900px, -900px);
  }
`;

export const Card = styled.img.attrs(({ location }) => {
  if (!location) return;
  return {
    style: {
      animationDelay: `${location.order * 0.08}s`,
    },
  };
})`
  position: relative;
  display: block;
  border-radius: 5px;
  height: 145px;
  width: 95px;
  animation: ${move} 0.3s ease-in-out 1 both;
  z-index: 2;
`;
