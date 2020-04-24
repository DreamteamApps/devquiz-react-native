import React, {useContext, useEffect} from 'react';

import {Container, Title} from './styles';
import {GameContext} from '~/Contexts/GameContext';
import io from 'socket.io-client';

export default function Question() {
  useEffect(() => {
    const socket = io('http://localhost', {
      path: '/myownpath',
    });
  }, []);
  const context = useContext(GameContext);
  return (
    <Container>
      <Title>{context.hubConnect}</Title>
    </Container>
  );
}
