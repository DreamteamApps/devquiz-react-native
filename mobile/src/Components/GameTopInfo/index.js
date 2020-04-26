import React, {useState, useEffect, useRef} from 'react';

import {Container, ContainerScore} from './styles';
import ScoreProfile from './ScoreProfile';
import Countdown from './Countdown';
import {useGame} from '~/Contexts/GameContext';

export default function GameTopInfo() {
  const {game} = useGame();

  const [valueTimer, setValueTimer] = useState(10); //

  const timer = useRef(10);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer.current >= 0) {
        setValueTimer(timer.current--);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      <Countdown value={valueTimer} />
      <ContainerScore>
        <ScoreProfile data={game.player} />
        <ScoreProfile data={game.opponent} alternative />
      </ContainerScore>
    </Container>
  );
}
