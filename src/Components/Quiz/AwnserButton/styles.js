import styled from 'styled-components/native';
import {hpx, wpx} from '~/Utils/styles';

export const ButtonContainer = styled.TouchableOpacity`
  flex-grow: 1;
  flex-shrink: 2;
  flex-basis: ${(props) => (props.small ? '40%' : '100%')};
  justify-content: center;
  align-items: center;
  height: ${hpx(66)};
  margin: ${hpx(10)};
  border-radius: ${hpx(10)};
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
  padding: ${hpx(10)};
`;

export const AvatarLeft = styled.Image`
  position: absolute;
  left: ${wpx(-18)};
  width: ${hpx(36)};
  height: ${hpx(36)};
  border-radius: ${hpx(25)};
  border-width: 2px;
  border-color: #fff;
`;

export const AvatarRight = styled.Image`
  position: absolute;
  right: ${wpx(-18)};
  width: ${hpx(36)};
  height: ${hpx(36)};
  border-radius: ${hpx(25)};
  border-width: 2px;
  border-color: #fff;
`;
