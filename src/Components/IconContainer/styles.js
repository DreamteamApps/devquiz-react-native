import styled from 'styled-components/native';
import {hpx, wpx} from '~/Utils/styles';

export const Container = styled.View`
  padding: ${hpx(25)};
  background: ${(props) => props.theme.colors.secondary};
  align-items: center;
  margin-top: ${hpx(110)};
  border-radius: ${hpx(20)};
  width: 80%;
`;

export const Avatar = styled.Image`
  width: ${wpx(100)};
  height: ${hpx(120)};
  border-radius: ${hpx(20)};
  margin-top: ${hpx(-110)};
  margin-bottom: ${hpx(10)};
  resize-mode: contain;
`;
export const Title = styled.Text`
  font-size: ${(props) => props.theme.fonts.large};
  font-family: ${(props) => props.theme.fontName.bold};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${hpx(5)};
  text-align: ${(props) => (props.alternative ? 'right' : 'left')};
`;
