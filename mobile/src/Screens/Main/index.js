import React, {useState, useEffect, useContext} from 'react';
import {Title, ButtonsContainer, Logo} from './styles';

import {getData} from '~/Service/AuthApi';
import InputText from '~/Components/InputText';
import CustomButton from '~/Components/CustomButton';
import {saveUser, getUser} from '~/Storage/UserStorage';
import {PageContainer} from '~/Components/Layout';
import Snackbar from 'react-native-snackbar';
import {useLinking} from '@react-navigation/native';
import {useAuth} from '~/Contexts/AuthContext';
import {useApp} from '~/Contexts/AppContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView} from 'react-native';

export default function Main({navigation}) {
  const [username, setUsername] = useState('');
  const ref = React.useRef();
  const {setUser} = useAuth();
  const {setLoading} = useApp();
  const {getInitialState} = useLinking(ref, {
    prefixes: ['http://devquiz.pt/invite', 'devquiz://invite'],
  });

  const getLocalUserData = async () => {
    const user = await getUser();

    if (user?.login) {
      const roomCode = await getDeepLink();
      if (roomCode) {
        navigation.navigate('JoinRoom', {roomCode: roomCode});
        setLoading(false);
      } else {
        getUserData(user.login);
      }
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    //check if we have this Local User
    setLoading(true);
    getLocalUserData();
  }, []);

  const getDeepLink = async () => {
    const deepLink = await getInitialState();
    let roomCode = deepLink?.routes[0]?.name;
    return roomCode;
  };
  const getUserData = async (username) => {
    setLoading(true);
    if (username) {
      try {
        const dataReturn = await getData(username);
        await saveUser(dataReturn.data);
        setUser(dataReturn.data);
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
        Snackbar.show({
          text: error.response.data.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } else {
      Snackbar.show({
        text: 'Type your github username',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    setLoading(false);
  };

  return (
    <PageContainer justifyContent="flex-start">
      <Logo source={require('~/Assets/Images/logo.png')} />
      <Title>Type your Github</Title>

      <InputText
        placeholder="type your github username"
        onChangeText={(text) => setUsername(text)}
        style={{width: '90%'}}
      />

      <ButtonsContainer>
        <CustomButton onPress={() => getUserData(username)}>Enter</CustomButton>
      </ButtonsContainer>
    </PageContainer>
  );
}
