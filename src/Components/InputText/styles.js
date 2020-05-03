import styled from 'styled-components/native';

export const Input = styled.TextInput`
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
  border-radius: 10px;
  margin-vertical: ${(props) => props.theme.wpx(20)};
  font-size: ${(props) => props.theme.fonts.medium};
  padding: ${(props) => props.theme.hpx(10)};
  width: 100%;
  text-align: center;
`;
