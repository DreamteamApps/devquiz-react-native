import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Container, AwnserContainer} from './styles';
import AwnserButton from '../AwnserButton';
import {useGame} from '~/Contexts/GameContext';
import {useAuth} from '~/Contexts/AuthContext';

export default function Awnser() {
  const {
    quiz,
    setQuiz,
    emit,
    game: {matchId},
    roundTime,
  } = useGame();
  const {user} = useAuth();
  const fadeRef = useRef(null);

  const [disableAllButtons, setDisableAllButtons] = useState(false);

  useEffect(() => {
    fadeRef.current.start();
  }, []);

  const selectAwnser = useCallback(
    (id) => {
      setDisableAllButtons(true);
      let newAnswers = quiz.answers;
      console.log('resp', id, quiz.answers, newAnswers[id - 1]);
      newAnswers[id - 1].playerSelected = true;
      setQuiz({
        ...quiz,
        disableAllButtons: true,
        answers: newAnswers,
      });
      emit('answer-question', {
        userId: user.id,
        matchId: matchId,
        questionId: quiz.questionId,
        answer: id,
        time: roundTime,
      });
    },
    [setQuiz, quiz.answers, roundTime],
  );

  return (
    <Container ref={fadeRef} duration={1000} delay={900}>
      <AwnserContainer
        ref={fadeRef}
        duration={1000}
        delay={900}
        small={!!quiz.questionImage}>
        {quiz.answers.map((i) => (
          <AwnserButton
            disabled={quiz.disableAllButtons}
            onSelect={() => selectAwnser(i.id)}
            showCorrectAnswer={quiz.showCorrectAnswer}
            key={i.id}
            correct={i.correct}
            playerSelected={i.playerSelected}
            opponentSelected={i.opponentSelected}
            small={!!quiz.questionImage}>
            {i.text}
          </AwnserButton>
        ))}
      </AwnserContainer>
    </Container>
  );
}
