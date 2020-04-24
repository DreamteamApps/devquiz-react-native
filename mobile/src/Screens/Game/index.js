import React, {useCallback, useState} from 'react';
import {Text} from 'react-native';
import {PageContainer} from '~/Components/Layout';
import RoundCounter from '~/Components/RoundCounter';
import Question from './Question';
import GameTopInfo from '../../Components/GameTopInfo';
import Header from '~/Components/Header';

export default function Game({actualRound = 1, totalRounds = 10}) {
  const [showRoundScreen, setShowRoundScreen] = useState(true);
  const [showQuestionScreen, setShowQuestionScreen] = useState(false);

  const setQuestionScreen = useCallback(() => {
    setShowRoundScreen(false);
    setShowQuestionScreen(true);
  }, []);

  return (
    <PageContainer>
      {showRoundScreen && (
        <RoundCounter
          actualRound={actualRound}
          totalRounds={totalRounds}
          hideScreen={setQuestionScreen}
        />
      )}

      {showQuestionScreen && (
        <>
          <Header />
          <GameTopInfo />
          <Question />
        </>
      )}
    </PageContainer>
  );
}
