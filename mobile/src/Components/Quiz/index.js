import React, {useState, useCallback} from 'react';
import {useGame} from '~/Contexts/GameContext';
import {Container, QuestionContainer, Question, Image} from './styles';
import Awnsers from './Awnsers';

export default function Quiz() {
  const {
    quiz: {question, questionImage},
  } = useGame();

  const componentSmall = !!questionImage;

  return (
    <Container>
      <QuestionContainer small={componentSmall}>
        <Question adjustsFontSizeToFit minimumFontScale={0.1}>
          {question}
        </Question>
      </QuestionContainer>
      <Image source={{uri: questionImage}} />
      <Awnsers />
    </Container>
  );
}
