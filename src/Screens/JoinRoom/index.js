import React, {useState, useEffect, useRef} from 'react';
import {Keyboard} from 'react-native';
import {
  Container,
  Title,
  ButtonsContainer,
  ContentContainer,
  Image,
  Digit,
} from './styles';
import {PageContainer} from '../../Components/Layout';

import CustomButton from '../../Components/CustomButton';
import Snackbar from 'react-native-snackbar';
import Header from '../../Components/Header';
import {useGame} from '~/Contexts/GameContext';
import {useAuth} from '~/Contexts/AuthContext';
import {joinMatch} from '~/Service/MatchApi';
import {useApp} from '~/Contexts/AppContext';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

export default function JoinRoom({navigation, route}) {
  const [roomCode, setRoomCode] = useState('');
  const {params} = route;
  const [value, setValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const CodeInputRef = useRef();
  const {user} = useAuth();
  const {game, setGame} = useGame();
  const {setLoading} = useApp();

  useEffect(() => {
    if (roomCode.length == 6 && !params?.roomCode) {
      getRoom(roomCode);
    }
  }, [roomCode]);

  useEffect(() => {
    CodeInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (params?.roomCode) {
      console.log(user);
      setRoomCode(params.roomCode);
      getRoom(params.roomCode);
    }
  }, [params]);

  const getRoom = async (roomCode) => {
    if (roomCode) {
      Keyboard.dismiss();
      setLoading(true);
      try {
        const dataReturn = await joinMatch(user.id, roomCode);
        const {matchId} = dataReturn.data;
        setGame({...game, matchId: matchId});
        setTimeout(() => {
          navigation.replace('WaitingRoom');
        }, 100);
      } catch (error) {
        Snackbar.show({
          text: error.response.data.message,
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
        <Image source={require('~/Assets/Images/smart_key.png')} />
        <Title>Room Code</Title>
        <CodeField
          ref={CodeInputRef}
          cellCount={6}
          keyboardType="number-pad"
          onChangeText={(text) => setRoomCode(text)}
          value={roomCode}
          renderCell={({index, symbol, isFocused}) => (
            <Digit key={index} onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Digit>
          )}></CodeField>
      </ContentContainer>
      <ButtonsContainer>
        <CustomButton onPress={() => getRoom(roomCode)}>Enter</CustomButton>
      </ButtonsContainer>
    </PageContainer>
  );
}
