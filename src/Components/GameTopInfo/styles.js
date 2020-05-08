import styled from 'styled-components/native';
import {hpx, wpx} from '~/Utils/styles';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: ${hpx(5)};
`;

export const ContainerScore = styled.View`
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`;
