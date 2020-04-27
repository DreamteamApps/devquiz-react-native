import React, {useEffect, useState, memo} from 'react';
import {PageContainer} from '~/Components/Layout';
import RoundCounter from '~/Components/RoundCounter';
import Question from '~/Components/Quiz';
import GameTopInfo from '../../Components/GameTopInfo';
import Header from '~/Components/Header';
import {useGame} from '~/Contexts/GameContext';

function Game() {
  const [showRoundScreen, setShowRoundScreen] = useState(true);
  const [showQuestionScreen, setShowQuestionScreen] = useState(false);

  const {hubConnect, game} = useGame();

  useEffect(() => {
    const listener = hubConnect.on('match-round-end', (data) => {
      console.log('match-round-end');
    });
    // return () => {
    //   socket.off('match-round-end', listener);
    // };
  }, []);
  return (
    <PageContainer>
      {game.showRoundScreen && (
        <RoundCounter
          actualRound={game.currentRound}
          totalRound={game.totalRound}
        />
      )}

      {game.showQuestionScreen && (
        <>
          {/* <Header close /> */}
          <GameTopInfo />
          <Question />
        </>
      )}
    </PageContainer>
  );
}

export default memo(Game);
