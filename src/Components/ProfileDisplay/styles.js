import styled from 'styled-components/native';
import {hpx, wpx} from '~/Utils/styles';

export const Container = styled.View`
  flex-direction: ${(props) => (props.alternative ? 'row-reverse' : 'row')};
  padding: 25px;
`;

export const Avatar = styled.Image`
  width: ${hpx(100)};
  height: ${hpx(100)};
  border-radius: ${hpx(50)};
  border-width: 2px;
  border-color: #fff;
`;
export const ProfileInfo = styled.View`
  margin-left: ${wpx(10)};
  margin-right: ${(props) => (props.alternative ? '10px' : '0')};
`;
export const Name = styled.Text`
  color: #fff;
  font-size: ${(props) => props.theme.fonts.large};
  text-align: ${(props) => (props.alternative ? 'right' : 'left')};
  font-family: ${(props) => props.theme.fontName.bold};
`;
export const Username = styled.Text`
  color: #fff;
  font-size: ${(props) => props.theme.fonts.medium};
  margin-bottom: ${hpx(10)};
  text-align: ${(props) => (props.alternative ? 'right' : 'left')};
  font-family: ${(props) => props.theme.fontName.medium};
`;
export const ReposContainer = styled.View`
  flex-direction: ${(props) => (props.alternative ? 'row-reverse' : 'row')};
`;
export const RepoIcon = styled.View`
  width: ${wpx(20)};
  height: ${hpx(20)};
`;
export const Repos = styled.Text`
  color: #fff;
  font-size: ${(props) => props.theme.fonts.medium};
  font-family: ${(props) => props.theme.fontName.medium};
`;
