import styled from 'styled-components/native';

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
  width: ${(props) => props.theme.hpx(100)};
  height: ${(props) => props.theme.hpx(100)};
  border-radius: ${(props) => props.theme.hpx(50)};

  align-items: center;
  justify-content: center;
  elevation: 5;
`;

export const VSImage = styled.Image``;

export const VSLine = styled.View`
  background: #fff;
  width: 100%;
  height: ${(props) => props.theme.hpx(5)};
  position: relative;
  flex: 1;
`;

export const OpponentContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: ${(props) => props.theme.hpx(50)};
`;

export const ShareContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
export const Code = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fonts.xxlarge};
  margin-bottom: ${(props) => props.theme.hpx(20)};
  font-family: ${(props) => props.theme.fontName.bold};
`;
export const CodeExplainText = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fonts.medium};
  font-family: ${(props) => props.theme.fontName.regular};
`;

export const ButtonsContainer = styled.View`
  width: 80%;
`;

export const CheckFirstPlayer = styled.View`
  position: absolute;
  bottom: ${(props) => props.theme.hpx(10)};
  right: ${(props) => props.theme.wpx(10)};
  opacity: ${(props) => (props.enabled ? '1' : '0.5')};
`;

export const CheckOpponent = styled.View`
  position: absolute;
  bottom: ${(props) => props.theme.hpx(-55)};
  right: ${(props) => props.theme.wpx(10)};
  opacity: ${(props) => (props.enabled ? '1' : '0.5')};
`;
