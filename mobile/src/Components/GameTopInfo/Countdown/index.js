import React, {memo} from 'react';

import {Container, Text} from './styles';
import {useGame} from '~/Contexts/GameContext';

function Countdown({value}) {
  const {game} = useGame();

  return (
    <Container>
      <Text>{game.currentTime}</Text>
    </Container>
  );
}
export default memo(Countdown);
