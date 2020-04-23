import styled from 'styled-components/native';


export const Title = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fonts.xlarge};
`;

export const ContentContainer = styled.View``;

export const ButtonsContainer = styled.View`
  bottom: 20px;
  width: 100%;
  padding-horizontal: 20px;
`;
