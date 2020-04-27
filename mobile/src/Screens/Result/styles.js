import styled from 'styled-components/native';

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fonts.xlarge};
  margin: 20px;
  text-align: center;
`;

export const ContentContainer = styled.View`
  background: #fff;

  width: 80%;
  border-radius: 10px;
  align-self: center;
`;

export const ButtonsContainer = styled.View`
  bottom: 20px;
  width: 100%;
  padding-horizontal: 20px;
`;
