import React, {useEffect, useRef} from 'react';
import {useGame} from '~/Contexts/GameContext';
import {Container, QuestionContainer, Question, Image} from './styles';
import Awnsers from './Awnsers';
import {Fade} from '../Animations';

export default function Quiz() {
  const {
    quiz: {question, questionImage},
  } = useGame();

  const componentSmall = !!questionImage;

  const fadeRef = useRef(null);

  useEffect(() => {
    fadeRef.current.start();
  }, [fadeRef.current]);

  return (
    <Container>
      <Fade ref={fadeRef} duration={1000} style={{flex: 1}}>
        <QuestionContainer small={componentSmall}>
          <Question adjustsFontSizeToFit minimumFontScale={0.1}>
            {question}
          </Question>
        </QuestionContainer>

        <Image source={{uri: questionImage}} />
      </Fade>
        <Awnsers />
    </Container>
  );
}
