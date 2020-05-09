import React, {useState} from 'react';

import {Container, Title, LoadingContainer} from './styles';
import {FlatList, ActivityIndicator} from 'react-native';
import UserListItem from './UserListItem';

export default function UserList({data, title, onPress}) {
  console.log(data);
  return (
    <Container>
      <Title>{title}</Title>
      {data ? (
        <FlatList
          data={data}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <UserListItem data={item} onPress={onPress} />
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
