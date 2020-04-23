import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import {Container} from './styles';
import {getUser} from '~/Utils/UserHelpers';
import Header from '../../Components/Header';
export default function ModeSelect() {
  const getUserData = async () => {
    const user = await getUser();
    console.warn(user);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Container>
      <Header back />
    </Container>
  );
}
