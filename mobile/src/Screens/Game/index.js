import React, {useEffect, useState, memo, useCallback} from 'react';
import {PageContainer} from '~/Components/Layout';
import RoundCounter from '~/Components/RoundCounter';
import Question from '~/Components/Quiz';
import GameTopInfo from '../../Components/GameTopInfo';
import Header from '~/Components/Header';
import {useGame} from '~/Contexts/GameContext';

function Game() {
  const {game, quiz, setQuiz, hubConnect} = useGame();

  const onQuestionRecived = useCallback((data) => {
    setQuiz({
      ...quiz,
      answers: [
        {text: data.answer1, id: 1},
        {text: data.answer2, id: 2},
        {text: data.answer3, id: 3},
        {text: data.answer4, id: 4},
      ],
      disableAllButtons: false,
      showCorrectAnswer: false,
      questionImage: data.image,
      question: data.title,
      questionId: data.id,
    });
  }, []);

  const onRoundEnd = useCallback(
    (data) => {
      let newAnwsers = quiz.answers;
      newAnwsers[data.correctAnswer - 1].correct = true;
      if (data?.opponent?.answer > 0)
        newAnwsers[data.opponent.answer - 1].opponentSelected = true;
      setQuiz({
        ...quiz,
        answers: newAnwsers,
        showCorrectAnswer: true,
      });
    },
    [quiz.answers],
  );

  useEffect(() => {
    console.log('assign match-start-question');
    hubConnect.on('match-start-question', onQuestionRecived);
    hubConnect.on('match-round-end', onRoundEnd);

    return () => {
      console.log('unassign match-start-question');
      hubConnect.off('match-start-question', onQuestionRecived);
      hubConnect.off('match-round-end', onRoundEnd);
    };
  }, [onQuestionRecived, onRoundEnd]);

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
