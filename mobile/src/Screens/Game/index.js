import React, {useEffect, memo, useCallback} from 'react';
import {PageContainer} from '~/Components/Layout';
import RoundCounter from '~/Components/RoundCounter';
import Question from '~/Components/Quiz';
import GameTopInfo from '../../Components/GameTopInfo';
import {useGame} from '~/Contexts/GameContext';

function Game({navigation}) {
  const {
    game,
    quiz,
    setQuiz,
    hubConnect,
    isPlayer,
    players,
    setPlayers,
  } = useGame();

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
      console.log('onRoundEnd', quiz);
      let newAnwsers = quiz.answers;
      let newPlayers = players;
      newAnwsers[data.correctAnswer - 1].correct = true;
      if (isPlayer(data?.owner?.id)) {
        if (data?.opponent?.answer > 0) {
          newAnwsers[data.opponent.answer - 1].opponentSelected = true;
        }
        newPlayers.player.score = data.owner.score;
        newPlayers.opponent.score = data.opponent.score;
      } else if (isPlayer(data?.opponent?.id)) {
        if (data?.owner?.answer > 0) {
          newAnwsers[data.owner.answer - 1].opponentSelected = true;
        }
        newPlayers.player.score = data.opponent.score;
        newPlayers.opponent.score = data.owner.score;
      }

      setPlayers(newPlayers);

      setQuiz({
        ...quiz,
        answers: newAnwsers,
        showCorrectAnswer: true,
        disableAllButtons: true,
      });
    },
    [quiz, quiz.answers, players],
  );

  const onMatchEndRecived = useCallback((data) => {
    console.log('onMatchEnd', data);
    let winned = false;
    let tied = !data?.opponent?.winned && !data?.owner?.winned;
    if (isPlayer(data?.owner?.id)) {
      winned = data?.owner?.winned;
    } else if (isPlayer(data?.opponent?.id)) {
      winned = data?.opponent?.winned;
    }

    navigation.replace('Result', {didWin: winned, didTie: tied});
  }, []);

  useEffect(() => {
    console.log('assign match-start-question');
    hubConnect.on('match-start-question', onQuestionRecived);
    hubConnect.on('match-round-end', onRoundEnd);
    hubConnect.on('player-disconnected', (data) => {
      console.log('disconnected');
    });

    hubConnect.on('match-end', onMatchEndRecived);

    return () => {
      console.log('unassign match-start-question');
      hubConnect.off('match-start-question', onQuestionRecived);
      hubConnect.off('match-round-end', onRoundEnd);
      hubConnect.off('player-disconnected');
    };
  }, [onQuestionRecived, onRoundEnd]);

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
          <GameTopInfo />
          <Question />
        </>
      )}
    </PageContainer>
  );
}

export default memo(Game);
