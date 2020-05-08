import styled from 'styled-components/native';
import {hpx, wpx} from '~/Utils/styles';

export const Container = styled.View`
  background: ${(props) => props.theme.colors.secondary};
  border-radius: ${hpx(30)};
  width: ${hpx(60)};
  height: ${hpx(60)};
  align-items: center;
  justify-content: center;
  border: 3px #a790f4;
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fonts.xlarge};
`;
