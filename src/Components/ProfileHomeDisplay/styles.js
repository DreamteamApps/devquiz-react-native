import styled from 'styled-components/native';
import {hpx, wpx} from '~/Utils/styles';

export const Container = styled.View`
  padding: ${wpx(15)};
  background: ${(props) => props.theme.colors.secondary};
  align-items: center;
  margin-top: ${hpx(50)};
  border-radius: ${wpx(20)};
  width: 80%;
  height: ${hpx(200)};
`;

export const Avatar = styled.Image`
  width: ${hpx(100)};
  height: ${hpx(120)};
  border-radius: 20px;
  margin-top: -${hpx(110)};
  margin-bottom: ${hpx(10)};
`;
export const ProfileInfo = styled.View`
  margin-left: ${wpx(10)};
  margin-right: ${(props) => (props.alternative ? '10px' : '0')};
  align-items: center;
`;
export const Name = styled.Text`
  color: #fff;
  font-size: ${(props) => props.theme.fonts.large};
  font-family: ${(props) => props.theme.fontName.bold};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${hpx(5)};
  text-align: ${(props) => (props.alternative ? 'right' : 'left')};
`;
export const Username = styled.Text`
  color: #fff;
  font-size: ${(props) => props.theme.fonts.medium};
  margin-bottom: ${hpx(10)};
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fontName.medium};
`;
export const ReposContainer = styled.View`
  flex-direction: ${(props) => (props.alternative ? 'row-reverse' : 'row')};
  color: ${(props) => props.theme.colors.gray};
  justify-content: center;
  align-items: center;
`;
export const RepoIcon = styled.Image`
  width: ${hpx(17)};
  height: ${hpx(17)};
  resize-mode: contain;
`;

export const Repos = styled.Text`
  color: #fff;
  font-size: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fontName.regular};
`;

export const ScoreContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  align-content: space-around;
  margin-top: ${hpx(10)};
`;
export const WinsLoosesContainer = styled.View`
  align-items: center;
  margin-horizontal: 10px;
`;
export const ScoreTitle = styled.Text`
  font-size: ${(props) => props.theme.fonts.small};
  color: ${(props) => props.theme.colors.gray};
  font-family: ${(props) => props.theme.fontName.regular};
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
