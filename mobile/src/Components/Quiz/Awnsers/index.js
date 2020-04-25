import React from 'react';
import {View, Text} from 'react-native';
import {Container, AwnserContainer} from './styles';
import AwnserButton from '../AwnserButton';

export default function Awnser({small, awnsers}) {
  return (
    <Container>
      <AwnserContainer small={small}>
        {awnsers.map((i) => (
          <AwnserButton key={i.text} selected={i.selected} small={small}>
            {i.text}
          </AwnserButton>
        ))}
      </AwnserContainer>
    </Container>
  );
}
