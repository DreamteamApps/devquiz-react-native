import React, {useEffect, useRef} from 'react';
import {Fade} from '../Animations';
import {TouchableHighlight, Text} from 'react-native';
import {RoundTitle} from './styles';

export default function RoundCounter({
  actualRound = 1,
  totalRounds = 10,
  hideScreen,
}) {
  const fadeRef = useRef(null);

  useEffect(() => {
    console.log(fadeRef.current);
    fadeRef.current.start();
  }, [fadeRef.current]);

  return (
    <Fade ref={fadeRef} onAnimationDone={hideScreen}>
      <RoundTitle>Round {actualRound}</RoundTitle>
      <RoundTitle small>
        {actualRound} of {totalRounds}
      </RoundTitle>
    </Fade>
  );
}
