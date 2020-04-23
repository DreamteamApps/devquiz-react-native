import React, {useState, useEffect} from 'react';

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
import Header from '../../Components/Header';
import {getUser} from '~/Storage/UserStorage';
import ProfileDisplay from '../../Components/ProfileDisplay';
import CustomButton from '../../Components/CustomButton';
import LottieView from 'lottie-react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

export default function WaitingRoom() {
  const [data, setData] = useState({});
  const [opponent, setOpponent] = useState();
  const getUserData = async () => {
    const user = await getUser();
    setData(user);
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container>
      <Header back />
      <GameContainer>
        <ProfileDisplay data={data} />
        <VSContainer>
          <VSLine></VSLine>

          <VSImageContainer>
            <LottieView
              source={require('../../Assets/Animations/timer.json')}
              autoPlay
              loop
              style={{height: 150, marginRight: -5, marginTop: -5}}
            />
            {/* <VSImage source={require('../../Assets/Images/sword.png')} /> */}
          </VSImageContainer>
          <VSLine>
            <CheckFirstPlayer>
              <IconIonicons
                name="ios-checkmark-circle"
                size={50}
                color="#2ECC71"
              />
            </CheckFirstPlayer>
            <CheckOpponent>
              <IconIonicons
                name="ios-checkmark-circle"
                size={50}
                color="#2ECC71"
              />
            </CheckOpponent>
          </VSLine>
        </VSContainer>
        {opponent ? (
          <>
            <OpponentContainer>
              <ProfileDisplay data={data} alternative />
            </OpponentContainer>
            <ButtonsContainer style={{width: '80%'}}>
              <CustomButton containerStyle={{marginBottom: 20}}>
                Ready
              </CustomButton>
            </ButtonsContainer>
          </>
        ) : (
          <>
            <ShareContainer>
              <Code>QRJFU</Code>
              <CodeExplainText style={{marginBottom: 55}}>
                Share this code with your friend
              </CodeExplainText>
              <CodeExplainText>Waiting for an opponent...</CodeExplainText>
            </ShareContainer>
            <ButtonsContainer style={{width: '80%'}}>
              <CustomButton
                containerStyle={{marginBottom: 20}}
                onPress={() => setOpponent({})}>
                Invite a friend
              </CustomButton>
            </ButtonsContainer>
          </>
        )}
      </GameContainer>
    </Container>
  );
}
