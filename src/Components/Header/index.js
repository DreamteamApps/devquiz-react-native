import React from 'react';
import {TouchableOpacity} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'styled-components';

import {Container, ButtonArea} from './styles';
import {useNavigation} from '@react-navigation/native';
import {useApp} from '~/Contexts/AppContext';

export default function Header({exitRoom, back, music}) {
  const navigation = useNavigation();
  const theme = useTheme();
  const {musicStatus, changeMusicStatus} = useApp();

  const handleBack = () => {
    exitRoom && exitRoom();
    navigation.goBack();
  };

  return (
    <Container>
      {back && (
        <TouchableOpacity onPress={() => handleBack()}>
          <ButtonArea>
            <IconIonicons
              name="ios-arrow-back"
              size={30}
              color={theme.colors.secondary}
            />
          </ButtonArea>
        </TouchableOpacity>
      )}
      {music && (
        <TouchableOpacity
          onPress={() => changeMusicStatus((musicStatus) => !musicStatus)}>
          <ButtonArea style={{alignSelf: 'flex-end'}}>
            <MaterialCommunityIcons
              name={musicStatus ? 'music' : 'music-off'}
              size={30}
              color={theme.colors.secondary}
            />
          </ButtonArea>
        </TouchableOpacity>
      )}
    </Container>
  );
}
