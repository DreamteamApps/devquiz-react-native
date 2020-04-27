import React from 'react';
import {ButtonContainer, AwnserText, AvatarLeft, AvatarRight} from './styles';
import {useGame} from '~/Contexts/GameContext';

export default function AwnserButton({
  onSelect,
  correct,
  playerSelected,
  opponentSelected,
  showCorrectAwnser,
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
      showCorrectAwnser={showCorrectAwnser}
      disabled={disabled}
      correct={correct}
      small={small}>
      <AwnserText
        showCorrectAwnser={showCorrectAwnser}
        correct={correct}
        selected={playerSelected}
        adjustsFontSizeToFit
        disableda={disabled}
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
