import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Container, AwnserContainer} from './styles';
import AwnserButton from '../AwnserButton';
import {useGame} from '~/Contexts/GameContext';

export default function Awnser() {
  const {quiz, setQuiz} = useGame();
  const fadeRef = useRef(null);

  const [disableAllButtons, setDisableAllButtons] = useState(false);

  useEffect(() => {
    fadeRef.current.start();
  }, []);

  const selectAwnser = useCallback(
    (index) => {
      setDisableAllButtons(true);
      let newAwnsers = quiz.awnsers;
      newAwnsers[index - 1].playerSelected = true;
      setQuiz({
        ...quiz,
        awnsers: newAwnsers,
      });
      setTimeout(() => {
        console.log('quiz updated', quiz);
        let newAwnsers = quiz.awnsers;
        newAwnsers[0].opponentSelected = true;
        newAwnsers[2].correct = true;
        setQuiz({...quiz, awnsers: newAwnsers, showCorrectAwnser: true});
      }, 2000);
    },
    [setQuiz],
  );

  return (
    <Container>
      <AwnserContainer
        ref={fadeRef}
        duration={1000}
        delay={900}
        small={!!quiz.questionImage}>
        {quiz.awnsers.map((i) => (
          <AwnserButton
            disabled={disableAllButtons}
            onSelect={() => selectAwnser(i.index)}
            showCorrectAwnser={quiz.showCorrectAwnser}
            key={i.text}
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
