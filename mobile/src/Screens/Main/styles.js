import styled from 'styled-components/native';

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fonts.xlarge};
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding:20px;
`;
