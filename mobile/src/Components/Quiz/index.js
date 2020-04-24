import React, {useState} from 'react';
import Awnsers from './Awnsers';
import {Container, QuestionContainer, Question, Image} from './styles';

export default function Quiz() {
  const [question, setQuestion] = useState(
    'Qual é a tua meu irmão ? pergunta grande da porra pergunta grande da porra pergunta grande da porra pergunta grande da porra pergunta grande da porra',
  );
  const [image, setImage] = useState(
    'https://pokemongohub.net/wp-content/uploads/2018/11/Pokemon-Lets-Go.jpg',
  );
  const [answer, setAnswer] = useState([]);
  const sizes = {
    questionSize: 50,
    imageSize: 50,
  };

  return (
    <Container>
      <QuestionContainer>
        <Question size={sizes.questionSize}>{question}</Question>
        <Image size={sizes.imageSize} source={{uri: image}}></Image>
      </QuestionContainer>
      <Awnsers></Awnsers>
    </Container>
  );
}
