import React from 'react';
import {View, Text} from 'react-native';
import {Container, AwnserContainer} from './styles';
import QuestionButton from '../QuestionButton';

export default function Awnser({small, awnsers = [1, 2, 3, 4]}) {
  return (
    <Container>
      <AwnserContainer small={small}>
        {awnsers.map((i) => (
          <QuestionButton key={i} small={small}>
            {i}
          </QuestionButton>
        ))}
      </AwnserContainer>
    </Container>
  );
}
