import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';

import {Container, ButtonsContainer} from './styles';
import {PageContainer} from '~/Components/Layout';
import Header from '~/Components/Header';
import ProfileHomeDisplay from '~/Components/ProfileHomeDisplay';
import CustomButton from '~/Components/CustomButton';
import {createRoom} from '~/Service/MatchApi';
import {getRecentlyUsers} from '~/Service/AuthApi';
import {useAuth} from '~/Contexts/AuthContext';
import {useGame} from '~/Contexts/GameContext';
import {useApp} from '~/Contexts/AppContext';

export default function Profile({navigation, route}) {
  const {user} = useAuth();
  const {game, setGame, hubConnect, emit} = useGame();
  const {
    params: {data},
  } = route;
  const {setLoading} = useApp();

  useEffect(() => {}, []);

  const handleCreateRoom = async (opponentId = '') => {
    setLoading(true);
    try {
      const dataReturn = await createRoom(user.id, opponentId);
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
      <ProfileHomeDisplay data={data} />

      <ButtonsContainer>
        <CustomButton onPress={() => handleCreateRoom(data.id)}>
          Challenge {data.name}
        </CustomButton>
      </ButtonsContainer>
    </PageContainer>
  );
}
