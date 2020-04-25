import React, {useCallback, useState, useEffect} from 'react';
import {Text} from 'react-native';
import {PageContainer} from '~/Components/Layout';
import RoundCounter from '~/Components/RoundCounter';
import Question from '~/Components/Quiz';
import GameTopInfo from '../../Components/GameTopInfo';
import Header from '~/Components/Header';
import {useGame} from '~/Contexts/GameContext';

export default function Game() {
  const [showRoundScreen, setShowRoundScreen] = useState(true);
  const [showQuestionScreen, setShowQuestionScreen] = useState(false);

  const {game, setGame} = useGame();

  const setQuestionScreen = useCallback(() => {
    setShowRoundScreen(false);
    setShowQuestionScreen(true);
  }, []);

  const changeRound = useCallback(() => {
    setShowRoundScreen(true);
    setShowQuestionScreen(false);
  }, []);

  useEffect(() => {
    // const interval = setInterval(() => {
    //   if (game.currentRound <= game.totalRounds) {
    //     setGame({...game, currentRound: game.currentRound++});
    //     changeRound();
    //   } else {
    //     clearInterval(interval);
    //     console.warn('terminou');
    //   }
    // }, 6000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);
  return (
    <PageContainer>
      {showRoundScreen && (
        <RoundCounter
          actualRound={game.currentRound}
          totalRounds={game.totalRounds}
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
