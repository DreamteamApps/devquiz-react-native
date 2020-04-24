import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content:flex-end;
  width: 100%;
`;

export const QuestionContainer = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  background-color: green;

`;

export const Question = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
  max-height: 30%;
  background-color: red;
  height: ${(props) => props.size}%;
`;

export const Image = styled.Image`
  height: ${(props) => props.size}%;
  display: ${(props) => (props.size === 0 ? 'none' : 'flex')};
  min-width: 90%;
  padding: 20px;
  background-color: green;
`;
