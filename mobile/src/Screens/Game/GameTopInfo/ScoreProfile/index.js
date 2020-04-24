import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, Avatar, ProfileInfo, Name, Score} from './styles';

export default function ScoreProfile({data, alternative}) {
  const {name, login, avatar, repos} = data;

  return (
    <Container alternative={alternative}>
      {avatar && <Avatar source={{uri: avatar}} />}
      <ProfileInfo alternative={alternative}>
        <Name alternative={alternative}>{name}</Name>
        <Score alternative={alternative}>@{login}</Score>
      </ProfileInfo>
    </Container>
  );
}
