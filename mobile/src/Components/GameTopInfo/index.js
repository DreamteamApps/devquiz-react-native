import React, {useState, useEffect, useRef, useContext} from 'react';
import {View} from 'react-native';
import {getUser} from '~/Storage/UserStorage';

import {Container, ContainerScore} from './styles';
import ScoreProfile from './ScoreProfile';
import Countdown from './Countdown';
import {useGame} from '~/Contexts/GameContext';

export default function GameTopInfo() {
  const {game} = useGame();

  const [data, setData] = useState({});
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
  const getUserData = async () => {
    const user = await getUser();
    setData(user);
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container>
      <Countdown value={valueTimer} />
      <ContainerScore>
        <ScoreProfile data={game.owner} />
        <ScoreProfile data={game.opponent} alternative />
      </ContainerScore>
    </Container>
  );
}
