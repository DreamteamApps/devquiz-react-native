import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {Container, Title, ButtonsContainer} from './styles';
import {getData} from '~/Service/githubApi';
import InputText from '../../Components/InputText';
import CustomButton from '../../Components/CustomButton';
import {saveUser} from '~/Utils/UserHelpers';

export default function Main({navigation}) {
  const [username, setUsername] = useState('');
  const getUserData = (username) => {
    if (username) {
      getData(username).then((dataReturn) => {
        saveUser(dataReturn.data).then((_) => {
          navigation.navigate('ModeSelect');
        });
      });
    } else {
      console.warn('insert your githut username');
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
