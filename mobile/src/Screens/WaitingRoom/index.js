import React, {useState, useEffect} from 'react';

import {
  Container,
  VSContainer,
  VSLine,
  VSImage,
  VSImageContainer,
  OponentContainer,
  GameContainer,
  ShareContainer,
  CodeExplainText,
  Code,
  ButtonsContainer,
  CheckContainer,
} from './styles';
import Header from '../../Components/Header';
import {getUser} from '~/Storage/UserStorage';
import ProfileDisplay from '../../Components/ProfileDisplay';
import CustomButton from '../../Components/CustomButton';
import LottieView from 'lottie-react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

export default function WaitingRoom() {
  const [data, setData] = useState({});
  const [oponent, setOponent] = useState();
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
            <CheckContainer>
              <IconIonicons
                name="ios-checkmark-circle"
                size={30}
                color="#2ECC71"
              />
            </CheckContainer>
          </VSLine>
        </VSContainer>
        {oponent ? (
          <>
            <OponentContainer>
              <ProfileDisplay data={data} alternative />
            </OponentContainer>
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
                onPress={() => setOponent({})}>
                Invite a friend
              </CustomButton>
            </ButtonsContainer>
          </>
        )}
      </GameContainer>
    </Container>
  );
}
