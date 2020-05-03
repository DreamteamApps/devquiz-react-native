import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.colors.btnBg};
  width: 100%;
  padding: ${(props) => props.theme.hpx(15)};
  border-radius: ${(props) => props.theme.hpx(10)};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  margin-bottom: ${(props) => props.theme.hpx(20)};
`;
export const Text = styled.Text`
  text-align: center;
  width: 100%;
  font-size: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.secondary};
  font-family: 'Ubuntu-Bold';
`;
