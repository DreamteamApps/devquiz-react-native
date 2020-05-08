import styled from 'styled-components/native';
import {hpx, wpx} from '~/Utils/styles';

export const Container = styled.View`
  align-items: flex-start;
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
  padding-vertical: ${hpx(10)};
  margin-top: ${hpx(20)};
  height: ${hpx(140)};
`;

export const ContainerUserList = styled.View`
  align-items: center;
  margin-right: ${wpx(5)};
`;
export const Image = styled.Image`
  height: ${hpx(60)};
  width: ${hpx(60)};
  border-radius: ${hpx(30)};
`;
export const Name = styled.Text.attrs((props) => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  width: ${wpx(90)};
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
  font-size: ${(props) => props.theme.fonts.small};
  margin-top: ${hpx(5)};
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
  font-size: ${(props) => props.theme.fonts.small};
  padding-horizontal: ${wpx(20)};
  font-weight: bold;
  margin-bottom: ${hpx(10)};
`;
export const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;
