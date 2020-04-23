import React, {useState, useEffect} from 'react';
import {Title, ButtonsContainer} from './styles';
import {PageContainer} from '../../Components/Layout';
import {getData} from '~/Service/githubApi';
import InputText from '../../Components/InputText';
import CustomButton from '../../Components/CustomButton';
import {saveUser, getUser} from '~/Storage/UserStorage';
import Snackbar from 'react-native-snackbar';
import {NavigationContainer, useLinking} from '@react-navigation/native';

export default function Main({navigation, routes}) {
  const [username, setUsername] = useState('');
  const ref = React.useRef();
  const {getInitialState} = useLinking(ref, {
    prefixes: ['http://devquiz', 'devquiz://'],
  });

  const getLocalUserData = async () => {
    const user = await getUser();

    if (user?.login) {
      const roomCode = await getDeepLink();
      if (roomCode) {
        navigation.navigate('JoinRoom', {roomCode: roomCode});
      } else {
        navigation.navigate('ModeSelect');
      }
    }
  };
  useEffect(() => {
    //check if we have this Local User
    getLocalUserData();
  }, []);

  const getDeepLink = async () => {
    const deepLink = await getInitialState();
    let roomCode =
      deepLink?.routes[0]?.state?.routes[0]?.state?.routes[0]?.name;
    return roomCode;
  };
  const getUserData = async (username) => {
    if (username) {
      try {
        const dataReturn = await getData(username);
        const {login, avatar_url, name, public_repos} = dataReturn.data;
        const user = {
          login,
          avatar: avatar_url,
          name: name || login,
          repos: public_repos,
        };
        await saveUser(user);
        navigation.navigate('ModeSelect');
      } catch (error) {
        Snackbar.show({
          text: 'Username not found. Check your username and try again',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } else {
      Snackbar.show({
        text: 'Type your github username',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  return (
    <PageContainer>
      <Title>Type your Github</Title>
      <InputText
        placeholder="type your github username"
        onChangeText={(text) => setUsername(text)}
        style={{width: 250}}
      />
      <ButtonsContainer>
        <CustomButton onPress={() => getUserData(username)}>Enter</CustomButton>
      </ButtonsContainer>
    </PageContainer>
  );
}
