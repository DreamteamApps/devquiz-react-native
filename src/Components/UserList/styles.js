import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: flex-start;
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
  padding-vertical: 10px;
  margin-top: 20px;
`;

export const ContainerUserList = styled.View`
  align-items: center;
  margin-right: 5px;
`;
export const Image = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 30px;
`;
export const Name = styled.Text.attrs((props) => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  width: 90px;
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
  font-size: ${(props) => props.theme.fonts.small};
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
  font-size: ${(props) => props.theme.fonts.small};
  padding-horizontal: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;
