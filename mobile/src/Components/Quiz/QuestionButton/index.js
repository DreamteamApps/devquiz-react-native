import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import {ButtonContainer, AwnserText} from './styles';

export default function QuestionButton({small, children}) {
  return (
    <ButtonContainer small={small}>
      <AwnserText adjustsFontSizeToFit minimumFontScale={0.1}>
        {children}
      </AwnserText>
    </ButtonContainer>
  );
}
