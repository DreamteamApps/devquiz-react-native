import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {
  Container,
  PlayerAvatar,
  ButtonsContainer,
  PlayerName,
  ScoreContainer,
  ScoreWinValue,
  ScoreLooseValue,
  WinsLoosesContainer,
} from './styles';
import {PageContainer} from '../../Components/Layout';

import CustomButton from '../../Components/CustomButton';
import {useGame} from '~/Contexts/GameContext';
import {useAuth} from '~/Contexts/AuthContext';
import {useApp} from '~/Contexts/AppContext';
import IconContainer from '~/Components/IconContainer';
import winIcon from '~/Assets/Images/win_icon.png';
import looseIcon from '~/Assets/Images/loose_icon.png';
import {AudioPlayer, AUDIOS} from '~/Utils/AudioPlayer';
export default function Result({navigation, route}) {
  const [title, setTitle] = useState('');
  const [btnPlayAgainText, setbtnPlayAgainText] = useState('Play again');
  const [btnPlayDisabled, setBtnPlayDisabled] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const [icon, setIcon] = useState(winIcon);
  const {user, setUser} = useAuth();
  const {didWin, didTie} = route.params;
  const {
    hubConnect,
    game,
    setGame,
    emit,
    players: {player, opponent},
  } = useGame();

  useEffect(() => {
    console.log(route.params);
    if (didWin) {
      setTitle('You win!');
      setIcon(winIcon);
      AudioPlayer().play(AUDIOS.WINNER, 'ui');
    } else if (didTie) {
      setTitle('Draw!');
      setIcon(winIcon);
      AudioPlayer().play(AUDIOS.WINNER, 'ui');
    } else {
      setTitle('You loose :(');
      setIcon(looseIcon);
      AudioPlayer().play(AUDIOS.LOOSER, 'ui');
    }
  }, []);

  const handlePlayAgain = () => {
    emit('answer-play-again', {
      userId: player.id,
      matchId: game.matchId,
    });
    setBtnPlayDisabled(true);
  };
  useEffect(() => {
    hubConnect.on('play-again-countdown', onPlayAgainCountdownReceived);
    hubConnect.on('play-again', onPlayAgainReceived);

    return () => {
      console.log('unassign play-again-countdown');
      hubConnect.off('play-again-countdown', onPlayAgainCountdownReceived);
      hubConnect.off('play-again', onPlayAgainReceived);
    };
  }, [onPlayAgainCountdownReceived]);

  const onPlayAgainCountdownReceived = ({seconds}) => {
    setSeconds(seconds);
    setbtnPlayAgainText(`Play again (${seconds})`);
    if (seconds == 0) {
      setBtnPlayDisabled(true);
      setbtnPlayAgainText(`Play again`);
    }
  };

  const onPlayAgainReceived = ({userId, matchId, matchCode}) => {
    console.log('onPlayAgainReceived');
    if (userId == user.id) {
      setGame({...game, matchId: matchId, roomCode: matchCode, player: {}});
      navigation.replace('WaitingRoom', {restart: true});
    }
  };
  return (
    <PageContainer justifyContent="space-between">
      <IconContainer icon={icon} title={title}>
        <ScoreContainer>
          <WinsLoosesContainer>
            <PlayerAvatar source={{uri: player?.avatar}} />
            <PlayerName>{player?.name}</PlayerName>
            {didWin ? (
              <ScoreWinValue>{player?.score}</ScoreWinValue>
            ) : (
              <ScoreLooseValue>{player?.score}</ScoreLooseValue>
            )}
          </WinsLoosesContainer>
          <WinsLoosesContainer>
            <PlayerAvatar source={{uri: opponent?.avatar}} />
            <PlayerName>{opponent?.name}</PlayerName>
            {didWin ? (
              <ScoreLooseValue>{opponent?.score}</ScoreLooseValue>
            ) : (
              <ScoreWinValue>{opponent?.score}</ScoreWinValue>
            )}
          </WinsLoosesContainer>
        </ScoreContainer>
      </IconContainer>

      <ButtonsContainer>
        <CustomButton
          onPress={() => handlePlayAgain()}
          disabled={btnPlayDisabled}>
          {btnPlayAgainText}
        </CustomButton>
        <CustomButton onPress={() => navigation.replace('Home')}>
          Give up
        </CustomButton>
      </ButtonsContainer>
    </PageContainer>
  );
}
