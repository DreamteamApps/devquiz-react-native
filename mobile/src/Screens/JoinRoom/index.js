import React, {useState, useEffect} from 'react';
import {Container, Title, ButtonsContainer, ContentContainer} from './styles';
import {PageContainer} from '../../Components/Layout';

import {getData} from '~/Service/githubApi';
import InputText from '../../Components/InputText';
import CustomButton from '../../Components/CustomButton';
import {saveUser, getUser} from '~/Storage/UserStorage';
import Snackbar from 'react-native-snackbar';
import Header from '../../Components/Header';
import {useGame} from '~/Contexts/GameContext';
import {useAuth} from '~/Contexts/AuthContext';
import {joinMatch} from '~/Service/MatchApi';
import {useApp} from '~/Contexts/AppContext';

export default function JoinRoom({navigation, route}) {
  const [roomCode, setRoomCode] = useState('');
  const {params} = route;
  const {user, setUser} = useAuth();
  const {game, setGame} = useGame();
  const {setLoading} = useApp();
  useEffect(() => {
    if (params?.roomCode) {
      console.log(user);
      setRoomCode(params.roomCode);
      getRoom(params.roomCode);
    }
  }, [params]);

  const getRoom = async (roomCode) => {
    if (roomCode) {
      setLoading(true);
      try {
        const dataReturn = await joinMatch(user.id, roomCode);
        const {matchId} = dataReturn.data;
        setGame({...game, matchId: matchId});
        setUser({...user, isOpponent: true});

        navigation.navigate('WaitingRoom');
      } catch (error) {
        console.log(error);
        Snackbar.show({
          text: 'Room Code not found. Check the number and try again',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
      setLoading(false);
    } else {
      Snackbar.show({
        text: 'Type the Room Code',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  return (
    <PageContainer justifyContent="space-between">
      <Header back />
      <ContentContainer>
        <Title>Room Code</Title>
        <InputText
          styles={{fontSize: 40, textAlign: 'center'}}
          placeholder="type the room code"
          onChangeText={(text) => setRoomCode(text)}
          keyboardType={'numeric'}
          maxLength={6}
          value={roomCode}
          style={{width: 250}}
        />
      </ContentContainer>
      <ButtonsContainer>
        <CustomButton onPress={() => getRoom(roomCode)}>Enter</CustomButton>
      </ButtonsContainer>
    </PageContainer>
  );
}
