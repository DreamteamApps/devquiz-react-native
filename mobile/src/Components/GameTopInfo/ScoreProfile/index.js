import React from 'react';

import {Container, Avatar, ProfileInfo, Name, Score} from './styles';

export default function ScoreProfile({data, alternative}) {
  return (
    <Container alternative={alternative}>
      {data?.avatar && <Avatar source={{uri: data?.avatar}} />}
      <ProfileInfo alternative={alternative}>
        <Name alternative={alternative}>{data?.name}</Name>
        <Score alternative={alternative}>{data?.score || 0}</Score>
      </ProfileInfo>
    </Container>
  );
}
