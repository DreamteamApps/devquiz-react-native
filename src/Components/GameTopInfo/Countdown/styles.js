import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.colors.secondary};
  border-radius: ${(props) => props.theme.hpx(30)};
  width: ${(props) => props.theme.hpx(60)};
  height: ${(props) => props.theme.hpx(60)};
  align-items: center;
  justify-content: center;
  border: 3px #a790f4;
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fonts.xlarge};
`;
