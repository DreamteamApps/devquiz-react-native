import React, {useEffect, useRef} from 'react';
import {Fade} from '../Animations';
import {RoundConteiner, RoundTitle} from './styles';

export default function RoundCounter({actualRound, totalRounds, hideScreen}) {
  const fadeRef = useRef(null);

  useEffect(() => {
    fadeRef.current.cycle(hideScreen);
  }, [fadeRef.current]);

  return (
    <Fade ref={fadeRef}>
      <RoundConteiner>
        <RoundTitle>Round {actualRound}</RoundTitle>
        <RoundTitle small>
          {actualRound} of {totalRounds}
        </RoundTitle>
      </RoundConteiner>
    </Fade>
  );
}
