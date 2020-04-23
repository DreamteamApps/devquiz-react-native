import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Avatar,
  ProfileInfo,
  Name,
  Username,
  ReposContainer,
  RepoIcon,
  Repos,
} from './styles';

export default function ProfileDisplay({data}) {
  const {name, login, avatar, repos} = data;

  return (
    <Container>
      {avatar && <Avatar source={{uri: avatar}} />}
      <ProfileInfo>
        <Name>{name}</Name>
        <Username>@{login}</Username>
        <ReposContainer>
          <Icon name="source-repository" size={25} color="#fff" />
          <Repos>{repos}</Repos>
        </ReposContainer>
      </ProfileInfo>
    </Container>
  );
}
