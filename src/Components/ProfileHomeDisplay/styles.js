import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Container = styled.View`
  padding: 25px;
  background: ${(props) => props.theme.colors.secondary};
  align-items: center;
  margin-top:${hp('8%')}px;
  border-radius: 20px;
  width: 80%;
  height:${hp('30%')}px;
`;

export const Avatar = styled.Image`
  width: ${hp('15%')}px;;
  height:${hp('15%')}px;
  border-radius: 20px;
  margin-top: -${hp('15%')}px;;
  margin-bottom: ${hp('1%')}px;
`;
export const ProfileInfo = styled.View`
  margin-left: 10px;
  margin-right: ${(props) => (props.alternative ? '10px' : '0')};
  align-items: center;
`;
export const Name = styled.Text`
  color: #fff;
  font-size: ${(props) => props.theme.fonts.large};
  font-family: ${(props) => props.theme.fontName.bold};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${hp('1%')}px;
  text-align: ${(props) => (props.alternative ? 'right' : 'left')};
`;
export const Username = styled.Text`
  color: #fff;
  font-size: ${(props) => props.theme.fonts.medium};
  margin-bottom: ${hp('1%')}px;
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
  width: ${hp('2%')}px;
  height: ${hp('2%')}px;
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
  margin-top: ${hp('2%')}px;

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
