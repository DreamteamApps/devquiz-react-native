import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.primary};
  flex: 1;
  align-items: center;
  padding-horizontal: 20px;
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  bottom: 20px;
  width: 100%;
`;
