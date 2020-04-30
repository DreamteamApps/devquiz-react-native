import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 25px;
  background: ${(props) => props.theme.colors.secondary};
  align-items: center;
  margin-top: 110px;
  border-radius: 20px;
  width: 80%;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 120px;
  border-radius: 20px;
  margin-top: -110px;
  margin-bottom: 10px;
  resize-mode: contain;
`;
export const Title = styled.Text`
  font-size: ${(props) => props.theme.fonts.large};
  font-family: ${(props) => props.theme.fontName.bold};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 5px;
  text-align: ${(props) => (props.alternative ? 'right' : 'left')};
`;
