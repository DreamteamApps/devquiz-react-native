import React from 'react';
import {TouchableOpacity} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';

import {Container} from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function Header({close, back}) {
  const navigation = useNavigation();

  return (
    <Container>
      {close && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconFeather name="x" size={30} color="#fff" />
        </TouchableOpacity>
      )}
      {back && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconIonicons name="ios-arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
      )}
    </Container>
  );
}
