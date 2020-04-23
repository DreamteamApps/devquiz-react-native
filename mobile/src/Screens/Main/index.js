import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {Container, Title, ButtonsContainer} from './styles';
import {getData} from '~/Service/githubApi';
import InputText from '../../Components/InputText';
import CustomButton from '../../Components/CustomButton';

export default function Main() {
  const [data, setData] = useState({});
  const [username, setUsername] = useState('');
  const getUserData = (username) => {
    if (username) {
      getData(username).then((dataReturn) => {
        console.warn(dataReturn.data);
        setData(dataReturn.data);
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
      />

      <Text>{data.name?.teste}</Text>
      <ButtonsContainer>
        <CustomButton onPress={() => getUserData(username)}>Enter</CustomButton>
      </ButtonsContainer>
    </Container>
  );
}
