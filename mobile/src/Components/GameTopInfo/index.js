import React, {useState, useEffect, useRef} from 'react';
import {View} from 'react-native';
import {getUser} from '~/Storage/UserStorage';

import {Container, ContainerScore} from './styles';
import ProfileDisplay from '~/Components/ProfileDisplay';
import ScoreProfile from './ScoreProfile';
import Countdown from './Countdown';

export default function GameTopInfo() {
  const [data, setData] = useState({});
  const [valueTimer, setValueTimer] = useState(10); //

  const timer = useRef(10);
  useEffect(() => {
    const interval = setInterval(() => {
      setValueTimer(timer.current--);
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
        <ScoreProfile data={data} />
        <ScoreProfile data={data} alternative />
      </ContainerScore>
    </Container>
  );
}
