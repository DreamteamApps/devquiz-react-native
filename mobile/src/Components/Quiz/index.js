import React, {useState,useContext} from 'react';
import Awnsers from './Awnsers';
import {GameContext} from '~/Contexts/GameContext';
import {Container, QuestionContainer, Question, Image} from './styles';

export default function Quiz() {
  const [question, setQuestion] = useState(
    'Qual é a tua meu irmão ?',
  );
  const [image, setImage] = useState(
    'https://pokemongohub.net/wp-content/uploads/2018/11/Pokemon-Lets-Go.jpg',
  );
  const [answer, setAnswer] = useState([]);
  const sizes = {
    questionSize: 50,
    imageSize: 50,
  };

  const context = useContext(GameContext);

  return (
    <Container>
      <QuestionContainer>
        <Question size={sizes.questionSize}>{question} {context.hubConnect}</Question>
        <Image size={sizes.imageSize} source={{uri: image}}></Image>
      </QuestionContainer>
      <Awnsers></Awnsers>
    </Container>
  );
}
