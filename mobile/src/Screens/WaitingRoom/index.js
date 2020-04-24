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

import timer from '~/Assets/Animations/timer.json';
import countdown from '~/Assets/Animations/countdown.json';

export default function WaitingRoom({navigation}) {
  const [data, setData] = useState({});
  const [opponent, setOpponent] = useState();
  const [hubConnection, setHubConnection] = useState();
  const [ready, setReady] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);
  const [centerAnimation, setCenterAnimation] = useState(timer);
  const getUserData = async () => {
    const user = await getUser();
    setData(user);
  };
  useEffect(() => {
    getUserData();
  }, []);

  const changeMyStatus = () => {
    let newValue = !ready;

    setReady(newValue);

    //simulating opponent ready
    if (newValue) {
      setTimeout(() => {
        setOpponentReady(true);

        setTimeout(() => {
          navigation.navigate('Game');
        }, 2000);
      }, 1000);
    }
  };

  return (
    <PageContainer justifyContent="flex-start">
      <Header back />
      <GameContainer>
        <ProfileDisplay data={data} />
        <VSContainer>
          <VSLine></VSLine>

          <VSImageContainer>
            {opponentReady ? (
              <LottieView
                source={countdown}
                autoPlay
                style={{height: 110, marginRight: 0, marginTop: 0}}
              />
            ) : (
              <LottieView
                source={timer}
                autoPlay
                loop
                style={{height: 150, marginRight: -5, marginTop: -5}}
              />
            )}

            {/* <VSImage source={require('../../Assets/Images/sword.png')} /> */}
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
              <Code>QRJFU</Code>
              <CodeExplainText style={{marginBottom: 60}}>
                Share this code with your friend
              </CodeExplainText>
              <CodeExplainText>Waiting for an opponent...</CodeExplainText>
            </ShareContainer>
            <ButtonsContainer style={{width: '80%'}}>
              <CustomButton
                containerStyle={{marginBottom: 20}}
                onPress={() =>
                  setOpponent({
                    name: 'Daniel Porto',
                    login: 'dankobaia',
                    repos: 10,
                    avatar:
                      'https://avatars1.githubusercontent.com/u/39194683?v=4',
                  })
                }>
                Invite a friend
              </CustomButton>
            </ButtonsContainer>
          </>
        )}
      </GameContainer>
    </PageContainer>
  );
}
