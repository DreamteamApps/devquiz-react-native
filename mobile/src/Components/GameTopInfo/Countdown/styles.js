import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 50px;
  width: 50px;
  height: 50px;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fonts.xlarge};
`;
