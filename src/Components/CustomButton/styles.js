import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.colors.btnBg};
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`;
export const Text = styled.Text`
  text-align: center;
  width: 100%;
  font-size: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.secondary};
  font-family: 'Ubuntu-Bold';
`;
