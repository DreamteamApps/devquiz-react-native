import styled from 'styled-components/native';

export const Container = styled.View`
  padding: ${(props) => props.theme.hpx(25)};
  background: ${(props) => props.theme.colors.secondary};
  align-items: center;
  margin-top: ${(props) => props.theme.hpx(110)};
  border-radius: ${(props) => props.theme.hpx(20)};
  width: 80%;
`;

export const Avatar = styled.Image`
  width: ${(props) => props.theme.wpx(100)};
  height: ${(props) => props.theme.hpx(120)};
  border-radius: ${(props) => props.theme.hpx(20)};
  margin-top: ${(props) => props.theme.hpx(-110)};
  margin-bottom: ${(props) => props.theme.hpx(10)};
  resize-mode: contain;
`;
export const Title = styled.Text`
  font-size: ${(props) => props.theme.fonts.large};
  font-family: ${(props) => props.theme.fontName.bold};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.hpx(5)};
  text-align: ${(props) => (props.alternative ? 'right' : 'left')};
`;
