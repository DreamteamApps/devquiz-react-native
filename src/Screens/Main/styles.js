import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import style from '~/Utils/styles';

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fonts.large};
  font-family: 'Ubuntu-Regular';
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  bottom: ${hp('0.5%')}px;
  width: 100%;
  padding: 20px;
`;

export const Logo = styled.Image`
  width: 100%;
  height: ${hp('13%')}px;
  resize-mode: contain;
  margin-bottom: ${hp('5%')}px;
  margin-top: ${hp('10%')}px;
  display: ${(props) => (props.hide ? 'none' : 'flex')};
`;

export const UserContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: ${hp('35%')}px;
`;
