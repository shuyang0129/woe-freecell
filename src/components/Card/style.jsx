import styled, { keyframes } from 'styled-components';

const move = isGameStarted => {
  if (!isGameStarted) {
    return keyframes`
      from {
        transform: translate(-900px, -900px);
      }
    `;
  }
};

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
  border: ${({ isShowHint }) => (isShowHint ? '1px solid #EF9A9A' : '')};
  border-radius: 5px;
  height: 145px;
  width: 95px;
  animation-name: ${({ isGameStarted }) => {
    return !isGameStarted && move(isGameStarted);
  }};
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  /* animation: ${move} 0.3s ease-in-out 1 both; */
  z-index: 2;
`;
