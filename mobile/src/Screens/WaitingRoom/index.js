import React, {useState, useEffect, useCallback} from 'react';

import {
  Container,
  VSContainer,
  VSLine,
  VSImage,
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

import Header from '../../Components/Header';
import {getUser} from '~/Storage/UserStorage';
import ProfileDisplay from '../../Components/ProfileDisplay';
import CustomButton from '../../Components/CustomButton';
import LottieView from 'lottie-react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {useAuth} from '~/Contexts/AuthContext';
import timer from '~/Assets/Animations/timer.json';
import swords from '~/Assets/Animations/swords.json';
import countdown from '~/Assets/Animations/countdown.json';
import {useGame} from '~/Contexts/GameContext';

export default function WaitingRoom({navigation}) {
  const [opponent, setOpponent] = useState();
  const [ready, setReady] = useState(false);
  const [startMatch, setStartMatch] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);

  const {user} = useAuth();
  const {hubConnect, game, emit} = useGame();

  useEffect(() => {
    if (game.matchId) {
      emit('join-match', {
        userId: user.id,
        matchId: game.matchId,
      });
    }

    hubConnect.on('player-joined', (data) => {
      console.log('player-joined', data);
      console.log('isOpponent', user.isOpponent);
      if (!user.isOpponent) {
        if (data.opponent) {
          setOpponent(data.opponent);
        }
      } else {
        setOpponent(data.owner);
      }
    });

    hubConnect.on('player-ready', (data) => {
      console.log('player-ready', data);
      if (data.userId != user.id) {
        setOpponentReady(true);
      } else {
        setReady(true);
      }
    });

    hubConnect.on('match-start', (data) => {
      setStartMatch(true);
      setTimeout(() => {
        navigation.navigate('Game');
      }, 4000);
    });
  }, []);
  const changeMyStatus = () => {
    emit('set-ready', {
      userId: user.id,
      matchId: game.matchId,
    });

    // let newValue = !ready;

    // setReady(newValue);

    // //simulating opponent ready
    // if (newValue) {
    //   setTimeout(() => {
    //     setOpponentReady(true);

    //     setTimeout(() => {
    //       navigation.navigate('Game');
    //     }, 4000);
    //   }, 1000);
    // }
  };

  return (
    <PageContainer justifyContent="flex-start">
      <Header back />
      <GameContainer>
        <ProfileDisplay data={user} />
        <VSContainer>
          <VSLine></VSLine>

          <VSImageContainer>
            {!opponent ? (
              <LottieView source={timer} autoPlay style={{height: 150}} />
            ) : startMatch ? (
              <LottieView
                source={countdown}
                autoPlay
                resizeMode="cover"
                style={{height: 80}}
              />
            ) : (
              <LottieView source={swords} autoPlay loop style={{height: 80}} />
            )}
          </VSImageContainer>
          <VSLine>
            {opponent && (
              <>
                <CheckFirstPlayer enabled={ready}>
                  <IconIonicons
                    name="ios-checkmark-circle"
                    size={50}
                    color="#2ECC71"
                  />
                </CheckFirstPlayer>
                <CheckOpponent enabled={opponentReady}>
                  <IconIonicons
                    name="ios-checkmark-circle"
                    size={50}
                    color="#2ECC71"
                  />
                </CheckOpponent>
              </>
            )}
          </VSLine>
        </VSContainer>
        {opponent ? (
          <>
            <OpponentContainer>
              <ProfileDisplay data={opponent} alternative />
            </OpponentContainer>
            <ButtonsContainer style={{width: '80%'}}>
              <CustomButton
                containerStyle={{marginBottom: 20}}
                onPress={() => changeMyStatus()}>
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
                onPress={() => setOpponent(game.opponent)}>
                Invite a friend
              </CustomButton>
            </ButtonsContainer>
          </>
        )}
      </GameContainer>
    </PageContainer>
  );
}
