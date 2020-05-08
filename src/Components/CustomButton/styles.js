import styled from 'styled-components/native';
import {hpx, wpx} from '~/Utils/styles';

export const Container = styled.View`
  background: ${(props) => props.theme.colors.btnBg};
  width: 100%;
  padding: ${hpx(15)};
  border-radius: ${hpx(10)};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  margin-bottom: ${hpx(20)};
`;
export const Text = styled.Text`
  text-align: center;
  width: 100%;
  font-size: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.secondary};
  font-family: 'Ubuntu-Bold';
`;
