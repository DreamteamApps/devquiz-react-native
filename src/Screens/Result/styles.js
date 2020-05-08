import styled from 'styled-components/native';
import {hpx, wpx} from '~/Utils/styles';

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fonts.xlarge};
  margin: ${hpx(20)};
  text-align: center;
`;

export const ContentContainer = styled.View`
  border-radius: ${hpx(10)};
  align-self: center;
`;

export const ButtonsContainer = styled.View`
  bottom: ${hpx(20)};
  width: 100%;
  padding-horizontal: ${hpx(20)};
`;

export const ScoreContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  align-content: center;
  justify-content: space-around;
  margin-top: ${hpx(20)};
`;
export const WinsLoosesContainer = styled.View`
  align-items: center;
  margin-horizontal: ${wpx(10)};
`;
export const PlayerAvatar = styled.Image`
  width: ${hpx(100)};
  height: ${hpx(100)};
  border-radius: ${hpx(50)};
`;
export const PlayerName = styled.Text.attrs((props) => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  width: ${wpx(120)};
  text-align: center;
  font-size: ${(props) => props.theme.fonts.small};
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fontName.regular};
  margin-vertical: ${hpx(10)};
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
