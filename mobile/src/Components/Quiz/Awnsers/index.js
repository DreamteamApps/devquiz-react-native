import React, {useState, useCallback} from 'react';
import {Container, AwnserContainer} from './styles';
import AwnserButton from '../AwnserButton';
import {useGame} from '~/Contexts/GameContext';

export default function Awnser() {
  const {game, setGame} = useGame();

  const {
    quiz: {awnsers, questionImage, showCorrectAwnser},
  } = game;

  const [disableAllButtons, setDisableAllButtons] = useState(false);

  const selectAwnser = useCallback(
    (index) => {
      setDisableAllButtons(true);
      let actualgame = game;
      actualgame.quiz.awnsers[index - 1].playerSelected = true;
      setGame(actualgame);
      setTimeout(() => {
        actualgame.quiz.awnsers[0].opponentSelected = true;
        actualgame.quiz.showCorrectAwnser = true;
        actualgame.quiz.awnsers[2].correct = true;
        setGame({...actualgame});
      }, 2000);
    },
    [setGame],
  );

  return (
    <Container>
      <AwnserContainer small={!!questionImage}>
        {awnsers.map((i) => (
          <AwnserButton
            disabled={disableAllButtons}
            onSelect={() => selectAwnser(i.index)}
            showCorrectAwnser={showCorrectAwnser}
            key={i.text}
            correct={i.correct}
            playerSelected={i.playerSelected}
            opponentSelected={i.opponentSelected}
            small={!!questionImage}>
            {i.text}
          </AwnserButton>
        ))}
      </AwnserContainer>
    </Container>
  );
}
