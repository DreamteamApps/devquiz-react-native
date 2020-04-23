import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.primary};
  flex: 1;
  align-items: center;
`;

export const GameContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

export const VSContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const VSImageContainer = styled.View`
  background: #fff;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  align-self: center;
  align-items: center;
  justify-content: center;
  elevation: 5;
`;

export const VSImage = styled.Image``;

export const VSLine = styled.View`
  background: #fff;
  width: 100%;
  height: 5px;
`;

export const OponentContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 50px;
`;

export const ShareContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
export const Code = styled.Text`
  color: #fff;
  font-size: 50px;
  margin-bottom: 20px;
`;
export const CodeExplainText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export const ButtonsContainer = styled.View`
  width: 80%;
`;
