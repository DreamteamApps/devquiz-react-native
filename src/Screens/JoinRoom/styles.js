import styled from 'styled-components/native';

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fonts.xlarge};
  margin-bottom: ${(props) => props.theme.hpx(20)};
  text-align: center;
  font-family: ${(props) => props.theme.fontName.medium};
`;

export const ContentContainer = styled.View`
  align-items: center;
  margin-bottom: ${(props) => props.theme.hpx(40)};
`;
export const Image = styled.Image`
  margin-bottom: ${(props) => props.theme.hpx(20)};
`;

export const ButtonsContainer = styled.View`
  bottom: ${(props) => props.theme.hpx(20)};
  width: 100%;
  padding-horizontal: ${(props) => props.theme.wpx(20)};
`;

export const Digit = styled.Text`
  width: ${(props) => props.theme.hpx(50)};
  height: ${(props) => props.theme.hpx(50)};
  line-height: ${(props) => props.theme.hpx(50)};
  font-size: ${(props) => props.theme.fonts.xlarge};
  margin-right: ${(props) => props.theme.wpx(10)};
  color: ${(props) => props.theme.colors.secondary};
  background: #a790f4;
  text-align: center;
  font-family: ${(props) => props.theme.fontName.medium};
`;
