import React from 'react';
import {TouchableOpacity} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import {useTheme} from 'styled-components';

import {Container, ButtonArea} from './styles';
import {useNavigation} from '@react-navigation/native';

export default function Header({close, back}) {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <Container>
      {close && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ButtonArea>
            <IconFeather name="x" size={30} color={theme.colors.secondary} />
          </ButtonArea>
        </TouchableOpacity>
      )}
      {back && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ButtonArea>
            <IconIonicons
              name="ios-arrow-back"
              size={30}
              color={theme.colors.secondary}
            />
          </ButtonArea>
        </TouchableOpacity>
      )}
    </Container>
  );
}
