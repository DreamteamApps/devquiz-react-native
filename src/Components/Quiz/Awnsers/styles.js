import styled from 'styled-components/native';
import {Fade} from '~/Components/Animations';

export const Container = styled(Fade).attrs({
  flex: 1,
  justifyContent: 'flex-end',
})`
  justify-content: flex-end;
  padding: ${(props) => props.theme.hpx(10)};
  height: 100%;
  width: 100%;
`;

export const AwnserContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  height: ${(props) => (props.small ? '200px' : '340px')};
`;
