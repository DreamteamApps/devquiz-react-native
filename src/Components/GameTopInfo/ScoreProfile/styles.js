import styled from 'styled-components/native';
import {hpx, wpx} from '~/Utils/styles';

export const Container = styled.View`
  flex-direction: ${(props) => (props.alternative ? 'row-reverse' : 'row')};
  padding: ${hpx(25)};
  align-items: center;
`;

export const Avatar = styled.Image`
  width: ${hpx(50)};
  height: ${hpx(50)};
  border-radius: ${hpx(25)};
  border-width: 2px;
  border-color: #fff;
`;
export const ProfileInfo = styled.View`
  margin-left: ${wpx(10)};
  margin-right: ${(props) => (props.alternative ? '10px' : '0')};
`;
export const Name = styled.Text.attrs((props) => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  color: #fff;
  font-size: ${(props) => props.theme.fonts.xxsmall};
  width: 90px;
  text-align: ${(props) => (props.alternative ? 'right' : 'left')};
`;

export const Score = styled.Text`
  color: #fff;
  font-size: ${(props) => props.theme.fonts.xxsmall};
  text-align: ${(props) => (props.alternative ? 'right' : 'left')};
`;
