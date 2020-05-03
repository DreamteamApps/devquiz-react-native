import React from 'react';

import {ContainerUserList, Image, Name} from './styles';
import {TouchableOpacity} from 'react-native';

export default function UserListItem({data: {key, id, name, avatar}, onPress}) {
  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <ContainerUserList>
        <Image source={{uri: avatar}} />
        <Name>{name}</Name>
      </ContainerUserList>
    </TouchableOpacity>
  );
}
