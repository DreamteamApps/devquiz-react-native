import React, {useState, useEffect, useContext} from 'react';
import {Title, ButtonsContainer} from './styles';

import {getData} from '~/Service/AuthApi';
import InputText from '~/Components/InputText';
import CustomButton from '~/Components/CustomButton';
import {saveUser, getUser} from '~/Storage/UserStorage';
import {PageContainer} from '~/Components/Layout';
import Snackbar from 'react-native-snackbar';
import {useLinking} from '@react-navigation/native';
import {useAuth} from '~/Contexts/AuthContext';

export default function Main({navigation}) {
  const [username, setUsername] = useState('');
  const ref = React.useRef();
  const {setUser} = useAuth();

  const {getInitialState} = useLinking(ref, {
    prefixes: ['http://devquiz.pt/invite', 'devquiz://invite'],
  });

  const getLocalUserData = async () => {
    const user = await getUser();
    console.warn(user);
    if (user?.login) {
      const roomCode = await getDeepLink();
      if (roomCode) {
        navigation.navigate('JoinRoom', {roomCode: roomCode});
      } else {
        setUser(user);
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
    let roomCode = deepLink?.routes[0]?.name;
    return roomCode;
  };
  const getUserData = async (username) => {
    if (username) {
      try {
        const dataReturn = await getData(username);

        await saveUser(dataReturn.data);
        setUser(dataReturn.data);

        navigation.navigate('ModeSelect');
      } catch (error) {
        console.log(error);
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
