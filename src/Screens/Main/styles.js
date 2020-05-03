import styled from 'styled-components/native';

import style from '~/Utils/styles';

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fonts.large};
  font-family: 'Ubuntu-Regular';
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  bottom: ${(props) => props.theme.hpx(20)};
  width: 100%;
  padding: 20px;
`;

export const Logo = styled.Image`
  width: 100%;
  height: ${(props) => props.theme.hpx(80)};
  resize-mode: contain;
  margin-bottom: ${(props) => props.theme.hpx(50)};
  margin-top: ${(props) => props.theme.hpx(10)};
  display: ${(props) => (props.hide ? 'none' : 'flex')};
`;

export const UserContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.hpx(230)};
`;
