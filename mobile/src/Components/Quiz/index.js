import React, {useState, useEffect, useContext} from 'react';
import {useTheme} from 'styled-components';
import {useGame} from '~/Contexts/GameContext';
import {Container, QuestionContainer, Question, Image} from './styles';
import Awnsers from './Awnsers';

export default function Quiz() {
  const theme = useTheme();

  const [image, setImage] = useState(
    'https://pokemongohub.net/wp-content/uploads/2018/11/Pokemon-Lets-Go.jpg',
  );
  const [answer, setAnswer] = useState([]);
  const sizes = {
    questionSize: 80,
    imageSize: 20,
  };

  const {
    game: {
      quiz: {question, awnsers, questionImage},
    }
  } = useGame();
  console.log(question)
  const componentSmall = !!questionImage;

  return (
    <Container>
      <QuestionContainer small={componentSmall}>
        <Question adjustsFontSizeToFit minimumFontScale={0.1}>
          {question}
        </Question>
      </QuestionContainer>
      <Image source={{uri: questionImage}} />
      <Awnsers small={componentSmall} awnsers={awnsers} />
    </Container>
  );
}
