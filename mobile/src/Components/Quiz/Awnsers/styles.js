import styled from 'styled-components/native';
import {Fade} from '~/Components/Animations';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: 10px;
  height: 100%;
`;

export const AwnserContainer = styled(Fade)`
  flex-direction: row;
  flex-wrap: wrap;
  height: ${(props) => (props.small ? '200px' : '340px')};
`;
