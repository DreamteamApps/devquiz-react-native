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

export default function ProfileDisplay({data, alternative}) {
  const {name, login, avatar, repos} = data;

  return (
    <Container alternative={alternative}>
      {avatar && <Avatar source={{uri: avatar}} />}
      <ProfileInfo alternative={alternative}>
        <Name alternative={alternative}>{name}</Name>
        <Username alternative={alternative}>@{login}</Username>
        <ReposContainer alternative={alternative}>
          <Icon name="source-repository" size={25} color="#fff" />
          <Repos>{repos}</Repos>
        </ReposContainer>
      </ProfileInfo>
    </Container>
  );
}
