import styled from 'styled-components/native';

export const PageContainer = styled.View`
  background: ${(props) => props.theme.colors.primary};
  flex: 1;
  align-items: ${(props) => props.alignItems ?? 'center'};
  justify-content:  ${(props) => props.justifyContent ?? 'center'};
`;
