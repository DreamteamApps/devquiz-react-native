import styled from 'styled-components/native';
import {Animated} from 'react-native';



export const RoundTitle = styled.Text`
  color: #fff;
  font-size: ${(props) =>
    props.small ? props.theme.fonts.large : props.theme.fonts.xxlarge};
  margin-bottom: 20px;
`;
