import styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
export const PageContainer = styled(SafeAreaView)`
  background: ${(props) => props.theme.colors.primary};
  flex: 1;
  align-items: ${(props) => props.alignItems ?? 'center'};
  justify-content: ${(props) => props.justifyContent ?? 'center'};
`;
