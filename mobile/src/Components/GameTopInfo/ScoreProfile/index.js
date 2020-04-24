import React from 'react';

import {Container, Avatar, ProfileInfo, Name, Score} from './styles';

export default function ScoreProfile({data, alternative}) {
  const {name, avatar, score} = data;

  return (
    <Container alternative={alternative}>
      {avatar && <Avatar source={{uri: avatar}} />}
      <ProfileInfo alternative={alternative}>
        <Name alternative={alternative}>{name}</Name>
        <Score alternative={alternative}>{name}</Score>
      </ProfileInfo>
    </Container>
  );
}
