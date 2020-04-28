import React from 'react';
import {ButtonContainer, AwnserText, AvatarLeft, AvatarRight} from './styles';
import {useGame} from '~/Contexts/GameContext';

export default function AwnserButton({
  onSelect,
  correct,
  playerSelected,
  opponentSelected,
  showCorrectAnswer,
  index,
  disabled,
  small,
  children,
}) {
  const {
    players: {player, opponent},
  } = useGame();

  return (
    <ButtonContainer
      onPress={onSelect}
      selected={playerSelected}
      showCorrectAnwser={showCorrectAnswer}
      disabled={disabled}
      correct={correct}
      small={small}>
      <AwnserText
        showCorrectAnwser={showCorrectAnswer}
        correct={correct}
        selected={playerSelected}
        adjustsFontSizeToFit
        opacity={disabled && !(playerSelected || correct)}
        minimumFontScale={0.1}>
        {children}
      </AwnserText>
      {playerSelected && (
        <AvatarLeft source={{uri: player.avatar}}></AvatarLeft>
      )}
      {opponentSelected && (
        <AvatarRight source={{uri: opponent.avatar}}></AvatarRight>
      )}
    </ButtonContainer>
  );
}
