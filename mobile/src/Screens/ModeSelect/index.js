import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import {Container, ButtonsContainer} from './styles';
import {PageContainer} from '~/Components/Layout';
import Header from '~/Components/Header';
import ProfileDisplay from '~/Components/ProfileDisplay';
import CustomButton from '~/Components/CustomButton';
import {createRoom} from '~/Service/MatchApi';
import {useAuth} from '~/Contexts/AuthContext';
import {useGame} from '~/Contexts/GameContext';
import {useApp} from '~/Contexts/AppContext';

export default function ModeSelect({navigation}) {
  const {user} = useAuth();
  const {game, setGame} = useGame();
  const {setLoading} = useApp();
  const handleCreateRoom = async () => {
    setLoading(true);
    try {
      const dataReturn = await createRoom(user.id);
      const {matchId, matchCode} = dataReturn.data;
      setGame({...game, matchId: matchId, roomCode: matchCode});
      navigation.navigate('WaitingRoom');
    } catch (error) {
      console.log(error);
      Snackbar.show({
        text: 'Server error, try again later.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }

    setLoading(false);
  };
  return (
    <PageContainer justifyContent="flex-start">
      <Header back />
      <ProfileDisplay />
      <ButtonsContainer>
        <CustomButton
          containerStyle={{marginBottom: 30}}
          onPress={() => handleCreateRoom()}>
          Create Room
        </CustomButton>
        <CustomButton onPress={() => navigation.navigate('JoinRoom')}>
          Join Room
        </CustomButton>
      </ButtonsContainer>
    </PageContainer>
  );
}
