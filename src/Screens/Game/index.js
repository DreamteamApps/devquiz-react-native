import React, {useEffect, memo, useCallback} from 'react';
import {PageContainer} from '~/Components/Layout';
import RoundCounter from '~/Components/RoundCounter';
import Question from '~/Components/Quiz';
import GameTopInfo from '../../Components/GameTopInfo';
import {useGame} from '~/Contexts/GameContext';
import AudioPlayer, { AUDIOS } from '~/Utils/AudioPlayer';

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

  //TESTAR
  const onRoundEnd = useCallback(
    (data) => {
      AudioPlayer.stop('countdown');
      console.log('onRoundEnd');
      let newAnwsers = quiz.answers;
      let newPlayers = players;
      const isOwner = isPlayer(data?.owner?.id);
      const myData = isOwner ? data.owner : data.opponent;
      const myOpponentData = !isOwner ? data.owner : data.opponent;
      newPlayers.player.score = myData.score;
      newPlayers.opponent.score = myOpponentData.score;

      newAnwsers[data.correctAnswer - 1].correct = true;

      if (myOpponentData.answer > 0) {
        newAnwsers[myOpponentData.answer - 1].opponentSelected = true;
      }
      if (myData.answer == data.correctAnswer) {
        AudioPlayer.play(AUDIOS.SUCCESS, 'ui');
      } else {
        AudioPlayer.play(AUDIOS.ERROR, 'ui');
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
      setShowQuestionScreen(false);
      //navigation.navigate('Game');
    });

    hubConnect.on('match-start-question', () => {
      console.log('match-start-question');
      setRoundTime('');
      setShowQuestionScreen(true);
      AudioPlayer.play(AUDIOS.COUNTDOWN, 'countdown');
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
