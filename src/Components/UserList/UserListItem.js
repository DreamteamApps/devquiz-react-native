import React from 'react';

import {ContainerUserList, Image, Name} from './styles';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function UserListItem({data, onPress}) {
  const navigation = useNavigation();
  const {id, login, avatar} = data;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Profile', {data})}>
      <ContainerUserList>
        <Image source={{uri: avatar}} />
        <Name>@{login}</Name>
      </ContainerUserList>
    </TouchableOpacity>
  );
}
