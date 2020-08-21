import React from 'react';

import * as S from './style';

const ControllButtons = () => {
  return (
    <S.ControllButtons>
      <S.ControllButton>NEW GAME</S.ControllButton>
      <S.ControllButton>RESTART</S.ControllButton>
      <S.ControllButton>HINT</S.ControllButton>
      <S.ControllButton>UNDO</S.ControllButton>
    </S.ControllButtons>
  );
};

export default ControllButtons;
