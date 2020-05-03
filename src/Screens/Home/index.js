import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import {Container, ButtonsContainer} from './styles';
import {PageContainer} from '~/Components/Layout';
import Header from '~/Components/Header';
import ProfileHomeDisplay from '~/Components/ProfileHomeDisplay';
import CustomButton from '~/Components/CustomButton';
import {createRoom} from '~/Service/MatchApi';
import {useAuth} from '~/Contexts/AuthContext';
import {useGame} from '~/Contexts/GameContext';
import {useApp} from '~/Contexts/AppContext';
import UserList from '~/Components/UserList';

export default function Home({navigation}) {
  const [recentlyUsers, setRecentlyUsers] = useState([
    {
      id: 1,
      name: 'Dan',
      avatar:
        'https://avatars2.githubusercontent.com/u/8238638?s=460&u=a499c24ad6318aeda4ec90997162537f4d6fcd8b&v=4',
    },
    {
      id: 2,
      name: 'dankobaia',
      avatar:
        'https://avatars2.githubusercontent.com/u/8238638?s=460&u=a499c24ad6318aeda4ec90997162537f4d6fcd8b&v=4',
    },
    {
      id: 3,
      name: 'teste',
      avatar:
        'https://avatars2.githubusercontent.com/u/8238638?s=460&u=a499c24ad6318aeda4ec90997162537f4d6fcd8b&v=4',
    },
    {
      id: 4,
      name: 'teste',
      avatar:
        'https://avatars2.githubusercontent.com/u/8238638?s=460&u=a499c24ad6318aeda4ec90997162537f4d6fcd8b&v=4',
    },
    {
      id: 5,
      name: 'teste',
      avatar:
        'https://avatars2.githubusercontent.com/u/8238638?s=460&u=a499c24ad6318aeda4ec90997162537f4d6fcd8b&v=4',
    },
    {
      id: 6,
      name: 'teste',
      avatar:
        'https://avatars2.githubusercontent.com/u/8238638?s=460&u=a499c24ad6318aeda4ec90997162537f4d6fcd8b&v=4',
    },
    {
      id: 7,
      name: 'teste',
      avatar:
        'https://avatars2.githubusercontent.com/u/8238638?s=460&u=a499c24ad6318aeda4ec90997162537f4d6fcd8b&v=4',
    },
    {
      id: 8,
      name: 'teste',
      avatar:
        'https://avatars2.githubusercontent.com/u/8238638?s=460&u=a499c24ad6318aeda4ec90997162537f4d6fcd8b&v=4',
    },
  ]);
  const {user} = useAuth();
  const {game, setGame} = useGame();
  const {setLoading} = useApp();

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
      <ProfileHomeDisplay />
      <UserList
        data={recentlyUsers}
        title={'Recently users'}
        onPress={handleCreateRoom}
      />
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
