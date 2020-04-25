import React, {useState, useEffect, useContext} from 'react';
import {useTheme} from 'styled-components';
import io from 'socket.io-client';
import {GameContext} from '~/Contexts/GameContext';
import {Container, QuestionContainer, Question, Image} from './styles';
import Awnsers from './Awnsers';

export default function Quiz() {
  const theme = useTheme();
  const [question] = useState(
    'ASdmk asdka skdas kasdkaskdk askdak sdka skd askd kas  ask a kas ka aks kak as',
  );
  const [image, setImage] = useState(
    'https://pokemongohub.net/wp-content/uploads/2018/11/Pokemon-Lets-Go.jpg',
  );
  const [answer, setAnswer] = useState([]);
  const sizes = {
    questionSize: 80,
    imageSize: 20,
  };

  useEffect(() => {
    const socket = io('http://localhost', {
      path: '/myownpath',
    });
  }, []);

  const context = useContext(GameContext);
  const componentSmall = image ? true : false;

  return (
    <Container>
      <QuestionContainer small={componentSmall}>
        <Question adjustsFontSizeToFit minimumFontScale={0.1}>
          {question} {context.hubConnect}
        </Question>
      </QuestionContainer>
      <Image source={{uri: image}}></Image>
      <Awnsers small={componentSmall}></Awnsers>
    </Container>
  );
}
