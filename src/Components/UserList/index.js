import React, {useState} from 'react';

import {Container, Title, LoadingContainer} from './styles';
import {FlatList, ActivityIndicator} from 'react-native';
import UserListItem from './UserListItem';

export default function UserList({data, title, onPress}) {
  return (
    <Container>
      <Title>{title}</Title>
      {data ? (
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <UserListItem key={`${item?.id}`} data={item} onPress={onPress} />
          )}
        />
      ) : (
        <LoadingContainer>
          <ActivityIndicator size="small" color="#fff" />
        </LoadingContainer>
      )}
    </Container>
  );
}
