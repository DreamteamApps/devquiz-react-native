import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: ${(props) => (props.alternative ? 'row-reverse' : 'row')};
  padding: 25px;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border-width: 2px;
  border-color: #fff;
`;
export const ProfileInfo = styled.View`
  margin-left: 10px;
  margin-right: ${(props) => (props.alternative ? '10px' : '0')};
`;
export const Name = styled.Text`
  color: #fff;
  font-size: 28px;
  text-align: ${(props) => (props.alternative ? 'right' : 'left')};
`;
export const Username = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
  text-align: ${(props) => (props.alternative ? 'right' : 'left')};
`;
export const ReposContainer = styled.View`
  flex-direction: ${(props) => (props.alternative ? 'row-reverse' : 'row')};
`;
export const RepoIcon = styled.View`
  width: 20px;
  height: 20px;
`;
export const Repos = styled.Text`
  color: #fff;
  font-size: 18px;
`;
