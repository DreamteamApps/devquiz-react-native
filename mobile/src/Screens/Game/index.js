import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {PageContainer} from '~/Components/Layout';
import RoundCounter from '~/Components/RoundCounter';
import Question from './Question';

export default function Game({actualRound = 1, totalRounds = 10}) {
  const [showRoundScreen, setShowRoundScreen] = useState(false);
  const [showQuestionScreen, setShowQuestionScreen] = useState(true);
  useEffect(() => {
    // var timeout = setTimeout(() => {
    //   setShowRoundScreen(false);
    // }, 3000);
    // return () => {
    //   clearTimeout(timeout);
    // };
  }, []);
  return (
    <PageContainer>
      {showRoundScreen && (
        <RoundCounter actualRound={actualRound} totalRounds={totalRounds} />
      )}

      {showQuestionScreen && <Question />}
    </PageContainer>
  );
}
