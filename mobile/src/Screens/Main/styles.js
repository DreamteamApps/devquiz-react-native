import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.primary};
  flex: 1;
  padding: 40px;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.Text`
  color: ${(props) => props.theme.secondary};
  font-size: 40px;
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  bottom: 20px;
  width: 100%;
`;
