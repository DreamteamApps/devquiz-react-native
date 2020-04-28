import styled from 'styled-components/native';

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fonts.large};
  font-family: 'Ubuntu-Regular';
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding: 20px;
`;

export const Logo = styled.Image`
  width: 100%;
  height: 80px;
  resize-mode: contain;
  margin-bottom: 50px;
  margin-top: 100px;
`;
