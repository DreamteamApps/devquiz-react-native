import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {AnimatedContainer, RoundTitle} from './styles';

export default function RoundCounter({actualRound = 1, totalRounds = 10}) {

  const fadeAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 5000,
    }).start();
  }, []);
  return (
    <AnimatedContainer opacity={fadeAnim}>
      <RoundTitle>Round {actualRound}</RoundTitle>
      <RoundTitle small>
        {actualRound} of {totalRounds}
      </RoundTitle>
    </AnimatedContainer>
  );
}
