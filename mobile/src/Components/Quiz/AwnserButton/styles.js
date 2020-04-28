import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity`
  flex-grow: 1;
  flex-shrink: 2;
  flex-basis: ${(props) => (props.small ? '40%' : '100%')};
  justify-content: center;
  align-items: center;
  height: 66px;
  margin: 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.showCorrectAnwser && props.correct
      ? props.theme.colors.green
      : props.showCorrectAnwser && !props.correct && props.selected
      ? props.theme.colors.red
      : props.theme.colors.secondary};
`;

export const AwnserText = styled.Text`
  opacity: ${(props) => (props.opacity ? 0.5 : 1)};
  color: ${(props) =>
    props.showCorrectAnwser && (props.correct || props.selected)
      ? props.theme.colors.secondary
      : props.theme.colors.btnText};
  text-align: center;
  font-size: ${(props) => props.theme.fonts.xxlarge};
  padding: 10px;
`;

export const AvatarLeft = styled.Image`
  position: absolute;
  left: -18px;
  width: 36px;
  height: 36px;
  border-radius: 25px;
  border-width: 2px;
  border-color: #fff;
`;

export const AvatarRight = styled.Image`
  position: absolute;
  background-color: red;
  right: -18px;
  width: 36px;
  height: 36px;
  border-radius: 25px;
  border-width: 2px;
  border-color: #fff;
`;
