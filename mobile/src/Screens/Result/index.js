import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {Container, Title, ButtonsContainer, ContentContainer} from './styles';
import {PageContainer} from '../../Components/Layout';

import CustomButton from '../../Components/CustomButton';
import {useGame} from '~/Contexts/GameContext';
import {useAuth} from '~/Contexts/AuthContext';
import {useApp} from '~/Contexts/AppContext';
import Header from '~/Components/Header';

export default function Result({navigation, route}) {
  const [title, setTitle] = useState('You loose :(');
  const {user, setUser} = useAuth();
  const {game, setGame} = useGame();
  const {setLoading} = useApp();

  return (
    <PageContainer justifyContent="space-between">
      <Header close />
      <ContentContainer>
        <Title>{title}</Title>
      </ContentContainer>
      <ButtonsContainer>
        <CustomButton>Play again</CustomButton>
      </ButtonsContainer>
    </PageContainer>
  );
}
