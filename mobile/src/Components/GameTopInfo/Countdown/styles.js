import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 30px;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  border: 3px #a790f4;
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fonts.xlarge};
`;
