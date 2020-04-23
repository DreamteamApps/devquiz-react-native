import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.primary};
  flex: 1;

  justify-content: space-between;
  align-items: center;
`;
export const Title = styled.Text`
  color: ${(props) => props.theme.secondary};
  font-size: 40px;
`;

export const ContentContainer = styled.View``;

export const ButtonsContainer = styled.View`
  bottom: 20px;
  width: 100%;
  padding-horizontal: 20px;
`;
