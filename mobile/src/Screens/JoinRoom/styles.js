import styled from 'styled-components/native';

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fonts.xlarge};
  margin-bottom: 20px;
  text-align: center;
  font-family: ${(props) => props.theme.fontName.medium};
`;

export const ContentContainer = styled.View`
  align-items: center;
  margin-bottom: 40px;
`;
export const Image = styled.Image`
  margin-bottom: 20px;
`;

export const ButtonsContainer = styled.View`
  bottom: 20px;
  width: 100%;
  padding-horizontal: 20px;
`;

export const Digit = styled.Text`
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: ${(props) => props.theme.fonts.xlarge};
  margin-right: 10px;
  color: ${(props) => props.theme.colors.secondary};
  background: #a790f4;
  text-align: center;
  font-family: ${(props) => props.theme.fontName.medium};
`;
