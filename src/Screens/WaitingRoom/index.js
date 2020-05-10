import React, {useState, useEffect} from 'react';
import {Platform, BackHandler, AppState} from 'react-native';
import {
  VSContainer,
  VSLine,
  VSImageContainer,
  OpponentContainer,
  GameContainer,
  ShareContainer,
  CodeExplainText,
  Code,
  ButtonsContainer,
  CheckOpponent,
  CheckFirstPlayer,
} from './styles';
import {PageContainer} from '../../Components/Layout';
import Snackbar from 'react-native-snackbar';

import Header from '../../Components/Header';
import ProfileDisplay from '../../Components/ProfileDisplay';
import CustomButton from '../../Components/CustomButton';
import LottieView from 'lottie-react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {useAuth} from '~/Contexts/AuthContext';
import timer from '~/Assets/Animations/timer.json';
import swords from '~/Assets/Animations/swords.json';
import countdown from '~/Assets/Animations/countdown.json';
import {useGame} from '~/Contexts/GameContext';
import Share from 'react-native-share';
import AudioPlayer, {AUDIOS} from '~/Utils/AudioPlayer';
import {useTheme} from 'styled-components';

export default function WaitingRoom({navigation, route}) {
  const [opponent, setOpponent] = useState();
  const [ready, setReady] = useState(false);
  const [startMatch, setStartMatch] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);
  const theme = useTheme();

  const {user} = useAuth();
  const {
    hubConnect,
    game,
    setGame,
    emit,
    players,
    setPlayers,
    setRoundTime,
  } = useGame();
  const backButtonHandler = () => {
    emit('leave-match');
  };

  const onPlayerJoined = (data) => {
    console.log(`player-joined ${Platform.OS}`);

    if (user.id == data.opponent?.id) {
      setOpponent(data.owner);
      setPlayers({...players, player: data.opponent, opponent: data.owner});
      AudioPlayer.play(AUDIOS.NEWUSER, 'ui');
    } else {
      if (data.opponent) {
        setOpponent(data.opponent);
        AudioPlayer.play(AUDIOS.NEWUSER, 'ui');
      }

      setPlayers({...players, player: data.owner, opponent: data.opponent});
    }
  };
  useEffect(() => {
    AppState.addEventListener('change', handleChangeAppState);

    AudioPlayer.play(AUDIOS.LOBBY);

    if (game.matchId) {
      console.log('joinmatch', {
        userId: user.id,
        matchId: game.matchId,
      });
      emit('join-match', {
        userId: user.id,
        matchId: game.matchId,
      });
    }

    hubConnect.on('player-joined', onPlayerJoined);

    hubConnect.on('player-ready', (data) => {
      console.log('player-ready');
      if (data.userId != user.id) {
        setOpponentReady(true);
        AudioPlayer.play(AUDIOS.READY, 'ui');
      } else {
        setReady(true);
        AudioPlayer.play(AUDIOS.READY, 'ui');
      }
    });

    hubConnect.on('match-start', (data) => {
      console.log('match-start');
      setStartMatch(true);
      // setTimeout(() => {
      // }, 5000);
    });

    hubConnect.on('player-leaved', ({isMatchOwner, userId}) => {
      console.log('player-leaved', isMatchOwner, userId);
      if (user.id != userId) {
        if (isMatchOwner) {
          navigation.goBack();
          backButtonHandler();
        } else {
          setOpponent(null);
          setOpponentReady(false);
        }

        Snackbar.show({
          text: 'Your opponent leave the match',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    });

    hubConnect.on('match-start-round', ({currentRound, totalRound}) => {
      console.log('match-start-round');
      setGame({
        ...game,
        showRoundScreen: true,
        currentRound: currentRound,
        totalRound: totalRound,
      });

      navigation.replace('Game');
    });

    // hubConnect.on('match-round-end', (data) => {
    //   console.log('match-round-end');
    // });
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      AudioPlayer.stop();
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
      hubConnect.off('player-leaved');
      hubConnect.off('match-start-round');
      hubConnect.off('match-start');
      hubConnect.off('player-ready');
      hubConnect.off('player-joined', onPlayerJoined);
      AppState.removeEventListener('change', handleChangeAppState);
    };
  }, []);
  const changeMyStatus = () => {
    emit('set-ready', {
      userId: user.id,
      matchId: game.matchId,
    });
  };
  const handleChangeAppState = (newState) => {
    if (newState === 'active') {
      AudioPlayer.play(AUDIOS.LOBBY);
    } else {
      AudioPlayer.stop();
    }
  };
  const handleFriendInvite = () => {
    const shareOptions = {
      title: 'DevQuiz',
      message: `I challenged you on DevQuiz! You can use this Room Code ${game.roomCode} or just click on the link below to enter.`,
      url: `https://devquiz.app/invite/${game.roomCode}`,
    };
    Share.open(shareOptions).catch((error) => {
      console.log('Failed to share:', error);
    });
  };

  return (
    <PageContainer justifyContent="flex-start">
      <Header back exitRoom={() => emit('leave-match')} music />
      <GameContainer>
        <ProfileDisplay data={user} />
        <VSContainer>
          <VSLine></VSLine>

          <VSImageContainer>
            {!opponent && (
              <LottieView
                source={timer}
                autoPlay
                style={{
                  height: 150,
                  marginRight: -5,
                  marginTop: Platform.OS == 'android' ? -4 : -2,
                }}
              />
            )}
            {opponent && startMatch && (
              <LottieView
                source={countdown}
                autoPlay
                style={{
                  height: 80,
                  marginTop: Platform.OS == 'android' ? 0 : -3,
                  marginLeft: Platform.OS == 'android' ? 0 : -1,
                }}
              />
            )}

            {opponent && !startMatch && (
              <LottieView source={swords} autoPlay loop style={{height: 80}} />
            )}
          </VSImageContainer>
          <VSLine>
            {opponent && (
              <>
                <CheckFirstPlayer enabled={ready}>
                  <IconIonicons
                    name="ios-checkmark"
                    size={50}
                    color={ready ? '#2ECC71' : '#fff'}
                  />
                </CheckFirstPlayer>
                <CheckOpponent enabled={opponentReady}>
                  <IconIonicons
                    name="ios-checkmark"
                    size={50}
                    color={opponentReady ? '#2ECC71' : '#fff'}
                  />
                </CheckOpponent>
              </>
            )}
          </VSLine>
        </VSContainer>
        {opponent ? (
          <>
            <OpponentContainer>
              <ProfileDisplay data={players.opponent} alternative />
            </OpponentContainer>
            <ButtonsContainer style={{width: '80%'}}>
              <CustomButton
                containerStyle={{marginBottom: 20}}
                onPress={() => changeMyStatus()}
                disabled={!!ready}>
                Ready
              </CustomButton>
            </ButtonsContainer>
          </>
        ) : (
          <>
            <ShareContainer>
              <Code>{game.roomCode}</Code>
              <CodeExplainText style={{marginBottom: 60}}>
                Share this code with your friend
              </CodeExplainText>
              <CodeExplainText>Waiting for an opponent...</CodeExplainText>
            </ShareContainer>
            <ButtonsContainer style={{width: '80%'}}>
              <CustomButton
                containerStyle={{marginBottom: 20}}
                onPress={() => handleFriendInvite()}
                onLongPress={() => setOpponent(game.opponent)}>
                Invite a friend
              </CustomButton>
            </ButtonsContainer>
          </>
        )}
      </GameContainer>
    </PageContainer>
  );
}
