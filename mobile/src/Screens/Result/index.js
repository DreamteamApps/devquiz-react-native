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
export default function Result({navigation, route}) {
  const [title, setTitle] = useState('');
  const [seconds, setSeconds] = useState(10);
  const [icon, setIcon] = useState(winIcon);
  const {user, setUser} = useAuth();
  const {didWin, didTie} = route.params;
  const {
    hubConnect,
    game,
    emit,
    players: {player, opponent},
  } = useGame();

  useEffect(() => {
    console.log(route.params);
    if (didWin) {
      setTitle('You win!');
      setIcon(winIcon);
    } else if (didTie) {
      setTitle('Draw!');
      setIcon(winIcon);
    } else {
      setTitle('You loose :(');
      setIcon(looseIcon);
    }
  }, []);

  const handlePlayAgain = () => {
    emit('answer-play-again', {
      userId: player.id,
      matchId: game.matchId,
    });
  };
  useEffect(() => {
    hubConnect.on('play-again-countdown', onPlayAgainCountdownRecived);
    hubConnect.on('play-again', onPlayAgainRecived);

    return () => {
      console.log('unassign play-again-countdown');
      hubConnect.off('play-again-countdown', onPlayAgainCountdownRecived);
      hubConnect.off('play-again', onPlayAgainRecived);
    };
  }, [onPlayAgainCountdownRecived]);

  const onPlayAgainCountdownRecived = ({seconds}) => {
    setSeconds(seconds);
  };

  const onPlayAgainRecived = (data) => {
    emit('answer-play-again', {
      userId: player.id,
      matchId: game.matchId,
    });
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
          containerStyle={{marginBottom: 30}}
          onPress={() => handlePlayAgain()}>
          Play again ({seconds})
        </CustomButton>
        <CustomButton onPress={() => navigation.replace('Main')}>
          Give up
        </CustomButton>
      </ButtonsContainer>
    </PageContainer>
  );
}
