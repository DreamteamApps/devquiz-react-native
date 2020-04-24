import styled from 'styled-components/native';

export const ButtonContainer = styled.View`
  flex-grow: 1;
  flex-shrink: 2;
  
  flex-basis: ${(props) => (props.small ? '40%' : '100%')};;
  justify-content: center;
  align-items: center;
  height: 66px;
  margin: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.secondary};
`;

export const AwnserText = styled.Text`
  color: ${(props) => props.theme.colors.btnText};
  text-align: center;
  font-size: ${(props) => props.theme.fonts.xxlarge};
`;
