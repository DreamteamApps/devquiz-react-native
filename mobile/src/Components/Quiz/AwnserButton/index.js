import React from 'react';
import {ButtonContainer, AwnserText} from './styles';

export default function AwnserButton({selected, small, children}) {
  return (
    <ButtonContainer small={small} selected={selected}>
      <AwnserText selected={selected} adjustsFontSizeToFit minimumFontScale={0.1}>
        {children}
      </AwnserText>
    </ButtonContainer>
  );
}
