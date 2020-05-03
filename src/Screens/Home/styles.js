import styled from 'styled-components/native';

export const ButtonsContainer = styled.View`
  position: absolute;
  bottom: ${(props) => props.theme.hpx(20)};
  width: 100%;
  padding-horizontal: ${(props) => props.theme.hpx(20)};
`;
