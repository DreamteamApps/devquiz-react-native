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
} from './styles';
import Header from '../../Components/Header';
import {getUser} from '~/Utils/UserHelpers';
import ProfileDisplay from '../../Components/ProfileDisplay';
import CustomButton from '../../Components/CustomButton';

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
            <VSImage source={require('../../Assets/Images/sword.png')} />
          </VSImageContainer>
          <VSLine></VSLine>
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
              <CodeExplainText style={{marginBottom: 30}}>
                Share this code with your friend
              </CodeExplainText>
              <CodeExplainText>Waiting for an opponent...</CodeExplainText>
            </ShareContainer>
            <ButtonsContainer style={{width: '80%'}}>
              <CustomButton containerStyle={{marginBottom: 20}}>
                Invite a friend
              </CustomButton>
            </ButtonsContainer>
          </>
        )}
      </GameContainer>
    </Container>
  );
}
