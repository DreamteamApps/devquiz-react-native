import styled from 'styled-components/native';
import {hpx, wpx} from '~/Utils/styles';

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fonts.xlarge};
  margin-bottom: ${hpx(20)};
  text-align: center;
  font-family: ${(props) => props.theme.fontName.medium};
`;

export const ContentContainer = styled.View`
  align-items: center;
  margin-bottom: ${hpx(40)};
`;
export const Image = styled.Image`
  margin-bottom: ${hpx(20)};
`;

export const ButtonsContainer = styled.View`
  bottom: ${hpx(20)};
  width: 100%;
  padding-horizontal: ${wpx(20)};
`;

export const Digit = styled.Text`
  width: ${hpx(50)};
  height: ${hpx(50)};
  line-height: ${hpx(50)};
  font-size: ${(props) => props.theme.fonts.xlarge};
  margin-right: ${wpx(10)};
  color: ${(props) => props.theme.colors.secondary};
  background: #a790f4;
  text-align: center;
  font-family: ${(props) => props.theme.fontName.medium};
`;
