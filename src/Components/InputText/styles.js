import styled from 'styled-components/native';
import {hpx, wpx} from '~/Utils/styles';

export const Input = styled.TextInput.attrs((props) => ({
  placeholderTextColor: '#999',
}))`
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
  border-radius: 10px;
  margin-vertical: ${wpx(20)};
  font-size: ${(props) => props.theme.fonts.medium};
  padding: ${hpx(10)};
  width: 100%;
  text-align: center;
`;
