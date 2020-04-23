import React, {useState, useEffect} from 'react';

import {
  Container,
  VSContainer,
  VSLine,
  VSImage,
  VSImageContainer,
  OponentContainer,
  GameContainer,
} from './styles';
import Header from '../../Components/Header';
import {getUser} from '~/Utils/UserHelpers';
import ProfileDisplay from '../../Components/ProfileDisplay';

export default function WaitingRoom() {
  const [data, setData] = useState({});
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
        <OponentContainer>
          <ProfileDisplay data={data} alternative />
        </OponentContainer>
      </GameContainer>
    </Container>
  );
}
