import styled from 'styled-components/native';

export const Input = styled.TextInput`
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
  border-radius: 10px;
  margin-vertical: 20px;
  font-size: ${(props) => props.theme.fonts.medium};;
  padding: 10px;
  width: 100%;
`;
