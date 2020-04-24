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
  height: ${(props) => (props.small ? '150px' : '300px')};
  padding: 10px 20px;
`;

export const Question = styled.Text`
  color: #fff;
  text-align: center;
  font-size: ${(props) => props.theme.fonts.xxlarge};
`;

export const Image = styled.Image`
  display: ${(props) => (props.size === 0 ? 'none' : 'flex')};
  min-width: 90%;
  min-height: 200px;
`;
