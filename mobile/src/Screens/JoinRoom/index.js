import React, {useState, useEffect} from 'react';
import {Container, Title, ButtonsContainer, ContentContainer} from './styles';
import {PageContainer} from '../../Components/Layout';

import {getData} from '~/Service/githubApi';
import InputText from '../../Components/InputText';
import CustomButton from '../../Components/CustomButton';
import {saveUser, getUser} from '~/Storage/UserStorage';
import Snackbar from 'react-native-snackbar';
import Header from '../../Components/Header';

export default function JoinRoom({navigation}) {
  const [roomCode, setRoomCode] = useState('');

  const getRoom = async (roomCode) => {
    if (roomCode) {
      try {
        // const dataReturn = await getData(username);
        // const {login, avatar_url, name, public_repos} = dataReturn.data;
        // const user = {
        //   login,
        //   avatar: avatar_url,
        //   name: name || login,
        //   repos: public_repos,
        // };
        // await saveUser(user);
        navigation.navigate('WaitingRoom');
      } catch (error) {
        Snackbar.show({
          text: 'Username not found. Check your username and try again',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
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
          style={{width: 250}}
        />
      </ContentContainer>
      <ButtonsContainer>
        <CustomButton onPress={() => getRoom(roomCode)}>Enter</CustomButton>
      </ButtonsContainer>
    </PageContainer>
  );
}
