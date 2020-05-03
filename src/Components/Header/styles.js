import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props) => props.theme.hpx(10)};
  width: 100%;
`;
export const ButtonArea = styled.View`
  padding: ${(props) => props.theme.hpx(10)};
  justify-content: flex-end;
  align-items: flex-end;
`;
