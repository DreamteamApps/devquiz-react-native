import React, {useState, useEffect, useRef} from 'react';

import {Container, ContainerScore} from './styles';
import ScoreProfile from './ScoreProfile';
import Countdown from './Countdown';
import {useGame} from '~/Contexts/GameContext';

export default function GameTopInfo() {
  const {players} = useGame();

  return (
    <Container>
      <Countdown />
      <ContainerScore>
        <ScoreProfile data={players.player} />
        <ScoreProfile data={players.opponent} alternative />
      </ContainerScore>
    </Container>
  );
}
