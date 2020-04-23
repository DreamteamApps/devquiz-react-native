import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.primary};
  flex: 1;
  align-items: center;
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding-horizontal: 20px;
`;
