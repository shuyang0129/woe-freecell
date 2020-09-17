import React from 'react';
import * as S from './style';
import Logo from '@img/logo/king_joy.png';

const Popup = () => {
  return (
    <S.PopupOverlay>
      <S.PopupContainer>
        <S.PopupContent>
          <S.Logo src={Logo} />
          <S.Title>congratulationS!</S.Title>
          <S.Description>You win the game!</S.Description>
          <S.ButtonContainer>
            <S.Button>PLAY AGAIN</S.Button>
            <S.Button>NEW GAME</S.Button>
          </S.ButtonContainer>
        </S.PopupContent>
      </S.PopupContainer>
    </S.PopupOverlay>
  );
};

export default Popup;
