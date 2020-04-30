import React, {memo} from 'react';

import {Container, Text} from './styles';
import {useGame} from '~/Contexts/GameContext';

function Countdown() {
  const {roundTime} = useGame();

  return (
    <Container>
      <Text>{roundTime}</Text>
    </Container>
  );
}
export default memo(Countdown);
