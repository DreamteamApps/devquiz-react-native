import React, {useContext} from 'react';

import {Container, Title} from './styles';
import {GameContext} from '~/Contexts/GameContext';
export default function Question() {
  const context = useContext(GameContext);
  return (
    <Container>
      <Title>{context.hubConnect}</Title>
    </Container>
  );
}
