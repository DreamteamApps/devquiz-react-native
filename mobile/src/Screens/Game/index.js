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
    setGame,
    hubConnect,
    isPlayer,
    players,
    setPlayers,
    setRoundTime,
    showQuestionScreen,
    setShowQuestionScreen,
    setShowRoundScreen,
    showRoundScreen,
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
      console.log('onRoundEnd');
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
    console.log('onMatchEnd');
    let winned = false;
    let tied = !data?.opponent?.winned && !data?.owner?.winned;
    if (isPlayer(data?.owner?.id)) {
      winned = data?.owner?.winned;
    } else if (isPlayer(data?.opponent?.id)) {
      winned = data?.opponent?.winned;
    }
    setShowQuestionScreen(false);

    navigation.replace('Result', {didWin: winned, didTie: tied});
  }, []);

  useEffect(() => {
    console.log('assign match-start-question');
    hubConnect.on('match-start-question', onQuestionRecived);
    hubConnect.on('match-round-end', onRoundEnd);
    hubConnect.on('match-countdown', ({seconds}) => {
      console.log('Going to update CountDown', seconds);
      setRoundTime(seconds);
    });
    hubConnect.on('match-start-round', ({currentRound, totalRound}) => {
      console.log('match-start-round');
      setGame({
        ...game,
        showRoundScreen: true,
        currentRound: currentRound,
        totalRound: totalRound,
      });

      //navigation.navigate('Game');
    });

    hubConnect.on('match-start-question', () => {
      console.log('match-start-question');
      setRoundTime(10);
      setShowQuestionScreen(true);
      setGame({
        ...game,
        showRoundScreen: false,
      });
    });

    hubConnect.on('match-end', onMatchEndRecived);

    return () => {
      console.log('unassign match-start-question');
      hubConnect.off('match-start-question', onQuestionRecived);
      hubConnect.off('match-round-end', onRoundEnd);
      hubConnect.off('match-countdown');
      hubConnect.off('match-start-question');
      hubConnect.off('match-start-round');
      hubConnect.off('match-end', onMatchEndRecived);
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

      {showQuestionScreen && (
        <>
          <GameTopInfo />
          <Question />
        </>
      )}
    </PageContainer>
  );
}

export default memo(Game);
