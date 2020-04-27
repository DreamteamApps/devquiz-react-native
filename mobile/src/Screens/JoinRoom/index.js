import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {Container, Title, ButtonsContainer, ContentContainer} from './styles';
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
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

export default function JoinRoom({navigation, route}) {
  const [roomCode, setRoomCode] = useState('');
  const {params} = route;
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
        <Title>Room Code</Title>
        <CodeField
          cellCount={6}
          keyboardType="number-pad"
          onChangeText={(text) => setRoomCode(text)}
          value={roomCode}
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}></CodeField>
      </ContentContainer>
      <ButtonsContainer>
        <CustomButton onPress={() => getRoom(roomCode)}>Enter</CustomButton>
      </ButtonsContainer>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 50,
    fontSize: 40,
    marginRight: 10,
    color: '#fff',
    backgroundColor: '#A790F4',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#fff',
  },
});
