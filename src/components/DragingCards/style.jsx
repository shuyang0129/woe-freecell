const { default: styled } = require('styled-components');

export const DragginCards = styled.div.attrs(({ initialOffset, currentOffset }) => {
  let { x, y } = currentOffset;
  return {
    style: {
      display: (!initialOffset || !currentOffset) && 'none',
      transform: `translate(${x}px, ${y}px)`,
    },
  };
})`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 100;
  & > :nth-child(n + 2) {
    box-shadow: 0 -0.5px rgba(186, 186, 186, 0.2);
    margin-top: -110px;
  }
`;

export const DragginerLayerContainer = styled.div`
  position: 'fixed';
  pointer-events: 'none';
  z-index: 100;
  left: 0;
  top: 0;
  width: '100%';
  height: '100%';
`;
