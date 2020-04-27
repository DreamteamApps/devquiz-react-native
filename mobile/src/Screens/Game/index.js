import React, {useCallback, useState, memo} from 'react';
import {PageContainer} from '~/Components/Layout';
import RoundCounter from '~/Components/RoundCounter';
import Question from '~/Components/Quiz';
import GameTopInfo from '../../Components/GameTopInfo';
import Header from '~/Components/Header';
import {useGame} from '~/Contexts/GameContext';

function Game() {
  const [showRoundScreen, setShowRoundScreen] = useState(true);
  const [showQuestionScreen, setShowQuestionScreen] = useState(false);

  const {game} = useGame();

  const setQuestionScreen = useCallback(() => {
    setShowRoundScreen(false);
    setShowQuestionScreen(true);
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
          <Header close />
          <GameTopInfo />
          <Question />
        </>
      )}
    </PageContainer>
  );
}

export default memo(Game);
