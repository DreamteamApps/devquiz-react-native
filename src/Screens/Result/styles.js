import styled from 'styled-components/native';

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fonts.xlarge};
  margin: 20px;
  text-align: center;
`;

export const ContentContainer = styled.View`
  border-radius: 10px;
  align-self: center;
`;

export const ButtonsContainer = styled.View`
  bottom: 20px;
  width: 100%;
  padding-horizontal: 20px;
`;

export const ScoreContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  align-content: center;
  justify-content:space-around
  margin-top: 20px;
`;
export const WinsLoosesContainer = styled.View`
  align-items: center;
  margin-horizontal: 10px;
`;
export const PlayerAvatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;
export const PlayerName = styled.Text.attrs((props) => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  width: 120px;
  text-align: center;
  font-size: ${(props) => props.theme.fonts.small};
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fontName.regular};
  margin-vertical: 10px;
`;
export const ScoreLooseValue = styled.Text`
  font-size: ${(props) => props.theme.fonts.large};
  color: ${(props) => props.theme.colors.red};
  font-family: ${(props) => props.theme.fontName.bold};
`;
export const ScoreWinValue = styled.Text`
  font-size: ${(props) => props.theme.fonts.large};
  color: ${(props) => props.theme.colors.green};
  font-family: ${(props) => props.theme.fontName.bold};
`;
