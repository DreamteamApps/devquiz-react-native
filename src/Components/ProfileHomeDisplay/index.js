import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Avatar,
  ProfileInfo,
  Name,
  Username,
  ReposContainer,
  Repos,
  RepoIcon,
  ScoreContainer,
  ScoreTitle,
  ScoreWinValue,
  ScoreLooseValue,
  WinsLoosesContainer,
} from './styles';
import {useAuth} from '~/Contexts/AuthContext';

export default function ProfileHomeDisplay({data, alternative}) {
  const {user} = useAuth();

  const {name, login, avatar, repos, wins, losses} = data || user;

  return (
    <Container>
      {avatar && <Avatar source={{uri: avatar}} />}
      <ProfileInfo>
        <Name>{name}</Name>
        <Username>@{login}</Username>
        <ReposContainer>
          <RepoIcon source={require('~/Assets/Images/repo_icon.png')} />
          {/* <Icon name="source-repository" size={25} color="#585858" /> */}
          <Repos>{repos}</Repos>
        </ReposContainer>

        <ScoreContainer>
          <WinsLoosesContainer>
            <ScoreTitle>Wins</ScoreTitle>
            <ScoreWinValue>{wins || 0}</ScoreWinValue>
          </WinsLoosesContainer>
          <WinsLoosesContainer>
            <ScoreTitle>Losses</ScoreTitle>
            <ScoreLooseValue>{losses || 0}</ScoreLooseValue>
          </WinsLoosesContainer>
        </ScoreContainer>
      </ProfileInfo>
    </Container>
  );
}
