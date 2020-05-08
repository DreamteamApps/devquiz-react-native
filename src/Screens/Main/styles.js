import styled from 'styled-components/native';
import {hpx, wpx} from '~/Utils/styles';

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fonts.large};
  font-family: 'Ubuntu-Regular';
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  bottom: ${hpx(20)};
  width: 100%;
  padding: ${hpx(20)};
`;
export const Logo = styled.Image`
  width: 100%;
  height: ${hpx(80)};
  resize-mode: contain;
  margin-bottom: ${hpx(70)};
  display: ${(props) => (props.hide ? 'none' : 'flex')};
`;

export const UserContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: ${hpx(230)};
`;
