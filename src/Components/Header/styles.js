import styled from 'styled-components/native';
import {hpx, wpx} from '~/Utils/styles';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${hpx(10)};
  width: 100%;
`;
export const ButtonArea = styled.View`
  padding: ${hpx(10)};
  justify-content: flex-end;
  align-items: flex-end;
`;
