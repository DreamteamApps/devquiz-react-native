import styled from 'styled-components/native';

export const Input = styled.TextInput`
  background: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.primary};
  border-radius: 10px;
  margin-vertical: 20px;
  font-size: 18px;
  padding: 10px;
  width: 100%;
`;
