import React, {useEffect} from 'react';
import {PageContainer} from '~/Components/Layout';

import {RoundTitle} from './styles';

export default function Game({actualRound = 1, totalRounds = 10, navigation}) {
  useEffect(() => {
    var timeout = setTimeout(() => {
      navigation.navigate('ModeSelect');
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <PageContainer>
      <RoundTitle>Round {actualRound}</RoundTitle>
      <RoundTitle small>
        {actualRound} of {totalRounds}
      </RoundTitle>
    </PageContainer>
  );
}
