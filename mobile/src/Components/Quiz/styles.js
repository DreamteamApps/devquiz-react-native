import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const QuestionContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.small ? '150px' : '250px')};
`;

export const Question = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
  font-size: ${(props) => props.theme.fonts.xxlarge};
  padding: 10px 20px;
`;

export const Image = styled.Image`
  min-height: 220px;
  min-width: 90%;
  resize-mode: contain;
`;
