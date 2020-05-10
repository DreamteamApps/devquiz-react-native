import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';

import {Container, ButtonsContainer} from './styles';
import {PageContainer} from './node_modules/~/Components/Layout';
import Header from './node_modules/~/Components/Header';
import ProfileHomeDisplay from './node_modules/~/Components/ProfileHomeDisplay';
import CustomButton from './node_modules/~/Components/CustomButton';
import {createRoom} from './node_modules/~/Service/MatchApi';
import {getRecentlyUsers} from './node_modules/~/Service/AuthApi';
import {useAuth} from './node_modules/~/Contexts/AuthContext';
import {useGame} from './node_modules/~/Contexts/GameContext';
import {useApp} from './node_modules/~/Contexts/AppContext';
import UserList from './node_modules/~/Components/UserList';

export default function Home({navigation}) {
  const [recentlyUsers, setRecentlyUsers] = useState([]);
  const {user} = useAuth();
  const {game, setGame, hubConnect, emit} = useGame();
  const {setLoading} = useApp();

  useEffect(() => {
    getRecentlyUsersData();
    hubConnect.on('recent-played', onRecentPlayed);
    emit('client-connect');

    return () => {
      hubConnect.off('recent-played', onRecentPlayed);
    };
  }, []);

  const getRecentlyUsersData = async () => {
    const userList = await getRecentlyUsers();
    setRecentlyUsers(filterMyselfFromRecentUsers(userList.data));
  };
  const onRecentPlayed = (data) => {
    console.log(`onRecentPlayed ${Platform.OS}`, data);
    setRecentlyUsers(filterMyselfFromRecentUsers(data));
  };
  const filterMyselfFromRecentUsers = (data) => {
    return data.filter((item) => item.id != user.id);
  };
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
      <Header back music />
      <ProfileHomeDisplay />
      <UserList
        data={recentlyUsers}
        title={'Recently users'}
        onPress={handleCreateRoom}
      />
      <ButtonsContainer>
        <CustomButton onPress={() => handleCreateRoom()}>
          Create Room
        </CustomButton>
        <CustomButton onPress={() => navigation.navigate('JoinRoom')}>
          Join Room
        </CustomButton>
      </ButtonsContainer>
    </PageContainer>
  );
}
