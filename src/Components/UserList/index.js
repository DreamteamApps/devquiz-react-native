import React, {useState} from 'react';

import {Container, Title} from './styles';
import {FlatList} from 'react-native';
import UserListItem from './UserListItem';

export default function UserList({data, title, onPress}) {
  return (
    <Container>
      <Title>{title}</Title>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <UserListItem
            key={item?.id.toString()}
            data={item}
            onPress={onPress}
          />
        )}
      />
    </Container>
  );
}
