import React, {useState} from 'react';
import {Container, Title, ButtonsContainer} from './styles';
import {getData} from '~/Service/githubApi';
import InputText from '../../Components/InputText';
import CustomButton from '../../Components/CustomButton';
import {saveUser} from '~/Utils/UserHelpers';
import Snackbar from 'react-native-snackbar';

export default function Main({navigation}) {
  const [username, setUsername] = useState('');

  const getUserData = async (username) => {
    if (username) {
      try {
        const dataReturn = await getData(username);
        const {login, avatar_url, name, public_repos} = dataReturn.data;
        const user = {
          login,
          avatar: avatar_url,
          name,
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
    <Container>
      <Title>Type your Github</Title>
      <InputText
        placeholder="type your github username"
        onChangeText={(text) => setUsername(text)}
        style={{width: 250}}
      />
      <ButtonsContainer>
        <CustomButton onPress={() => getUserData(username)}>Enter</CustomButton>
      </ButtonsContainer>
    </Container>
  );
}
