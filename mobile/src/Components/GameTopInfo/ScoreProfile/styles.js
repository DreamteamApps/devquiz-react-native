import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: ${(props) => (props.alternative ? 'row-reverse' : 'row')};
  padding: 25px;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border-width: 2px;
  border-color: #fff;
`;
export const ProfileInfo = styled.View`
  margin-left: 10px;
  margin-right: ${(props) => (props.alternative ? '10px' : '0')};
`;
export const Name = styled.Text.attrs((props) => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  color: #fff;
  font-size: 13px;
  width: 90px;
  text-align: ${(props) => (props.alternative ? 'right' : 'left')};
`;

export const Score = styled.Text`
  color: #fff;
  font-size: 12px;
  text-align: ${(props) => (props.alternative ? 'right' : 'left')};
`;
