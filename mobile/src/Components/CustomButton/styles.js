import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.colors.secondary};
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  elevation: 5;

  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;
export const Text = styled.Text`
  text-align: center;
  width: 100%;
  font-size: ${(props) => props.theme.fonts.large};
  color: ${(props) => props.theme.colors.btnText};
`;
