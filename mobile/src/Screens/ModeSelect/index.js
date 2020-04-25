import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import {Container, ButtonsContainer} from './styles';
import {PageContainer} from '~/Components/Layout';
import Header from '~/Components/Header';
import ProfileDisplay from '~/Components/ProfileDisplay';
import CustomButton from '~/Components/CustomButton';

export default function ModeSelect({navigation}) {
  const [data, setData] = useState({});

  return (
    <PageContainer justifyContent="flex-start">
      <Header back />
      <ProfileDisplay />
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
    </PageContainer>
  );
}
