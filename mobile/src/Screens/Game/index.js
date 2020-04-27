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

  const {game, quiz, setQuiz, hubConnect} = useGame();


  const onQuestionRecived = (data) => {
    console.log('HSUAUHSUAHSUA', data);
    console.log('v', quiz);

    // let newAnswers = quiz.answer;
    // newAnswers[0] = data.answer1;
    // newAnswers[1] = data.answer2;
    // newAnswers[2] = data.answer3;
    // newAnswers[3] = data.answer4;
    // setQuiz({
    //   ...quiz,
    //   answers: newAnswers,
    //   questionImage: data.image,
    //   question: data.title,
    // });

  };
    useEffect(() => {
    hubConnect.on('match-start-question', onQuestionRecived);
    // return () => {
    //   hubConnect.off('match-start-question', onQuestion);
    // };
  }, [onQuestion]);

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
