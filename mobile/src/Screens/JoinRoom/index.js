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
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const CodeInputRef = useRef();

  useEffect(() => {
    if (roomCode.length == 6) {
      getRoom(roomCode);
    }
  }, [roomCode]);

  useEffect(() => {
    CodeInputRef.current.focus();
  }, []);

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
      Keyboard.dismiss();
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
