import React, {useState, useEffect, useContext} from 'react';
import {Title, ButtonsContainer, Logo} from './styles';

import {getData} from '~/Service/AuthApi';
import InputText from '~/Components/InputText';
import CustomButton from '~/Components/CustomButton';
import {
  saveUser,
  getUser,
  savePushToken,
  getPushToken,
} from '~/Storage/UserStorage';
import {PageContainer} from '~/Components/Layout';
import Snackbar from 'react-native-snackbar';
import {useLinking} from '@react-navigation/native';
import {useAuth} from '~/Contexts/AuthContext';
import {useApp} from '~/Contexts/AppContext';
import OneSignal from 'react-native-onesignal';

export default function Main({navigation}) {
  const [username, setUsername] = useState('');
  const ref = React.useRef();
  const {setUser} = useAuth();
  const {setLoading} = useApp();
  const {getInitialState} = useLinking(ref, {
    prefixes: ['http://devquiz.app/invite', 'devquiz://invite'],
  });

  const oneSignalConfiguration = () => {
    OneSignal.init('96aa2b3c-b7a4-411c-a10a-0b14fe2c6d0a', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.addEventListener('received', onPushReceived);
    OneSignal.addEventListener('ids', (device) => {
      if (device && device.userId) {
        savePushToken(device.userId);
        //AsyncStorage.setItem('playerId', device.userId);
      }
    });
  };
  const onPushReceived = (notification) => {
    console.log(notification);
  };
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
    oneSignalConfiguration();
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
        let pushToken = await getPushToken();
        const dataReturn = await getData(username, pushToken);
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
