import React, {useEffect, useRef} from 'react';
import {Fade} from '../Animations';
import {RoundConteiner, RoundTitle} from './styles';

export default function RoundCounter({actualRound, totalRound, hideScreen}) {
  const fadeRef = useRef(null);

  useEffect(() => {
    fadeRef.current.start(hideScreen);
  }, [fadeRef.current]);

  return (
    <Fade ref={fadeRef}>
      <RoundConteiner>
        <RoundTitle>Round {actualRound}</RoundTitle>
        <RoundTitle small>
          {actualRound} of {totalRound}
        </RoundTitle>
      </RoundConteiner>
    </Fade>
  );
}
