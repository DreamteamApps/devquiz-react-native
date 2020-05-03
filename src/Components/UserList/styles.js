import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: flex-start;
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
  padding-vertical: ${(props) => props.theme.hpx(10)};
  margin-top: ${(props) => props.theme.hpx(20)};
  height: ${(props) => props.theme.hpx(140)};
`;

export const ContainerUserList = styled.View`
  align-items: center;
  margin-right: ${(props) => props.theme.wpx(5)};
`;
export const Image = styled.Image`
  height: ${(props) => props.theme.hpx(60)};
  width: ${(props) => props.theme.hpx(60)};
  border-radius: ${(props) => props.theme.hpx(30)};
`;
export const Name = styled.Text.attrs((props) => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  width: ${(props) => props.theme.wpx(90)};
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
  font-size: ${(props) => props.theme.fonts.small};
  margin-top: ${(props) => props.theme.hpx(5)};
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
  font-size: ${(props) => props.theme.fonts.small};
  padding-horizontal: ${(props) => props.theme.wpx(20)};
  font-weight: bold;
  margin-bottom: ${(props) => props.theme.hpx(10)};
`;
export const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;
