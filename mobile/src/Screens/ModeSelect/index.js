import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import {Container, ButtonsContainer} from './styles';
import {getUser} from '~/Utils/UserHelpers';
import Header from '../../Components/Header';
import ProfileDisplay from '../../Components/ProfileDisplay';
import CustomButton from '../../Components/CustomButton';
export default function ModeSelect({navigation}) {
  const [data, setData] = useState({});
  const getUserData = async () => {
    const user = await getUser();
    console.warn(user);
    setData(user);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Container>
      <Header back />
      <ProfileDisplay data={data} />
      <ButtonsContainer>
        <CustomButton
          containerStyle={{marginBottom: 30}}
          onPress={() => navigation.navigate('WaitingRoom')}>
          Create Room
        </CustomButton>
        <CustomButton onPress={() => navigation.navigate('JoinRoom')}>
          Join Room
        </CustomButton>
      </ButtonsContainer>
    </Container>
  );
}
