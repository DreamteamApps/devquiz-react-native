import styled from 'styled-components/native';
import {hpx, wpx} from '~/Utils/styles';
import {Fade} from '~/Components/Animations';

export const Container = styled(Fade).attrs({
  flex: 1,
  justifyContent: 'flex-end',
})`
  justify-content: flex-end;
  padding: ${hpx(10)};
  height: 100%;
  width: 100%;
`;

export const AwnserContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  height: ${(props) =>
    props.small ? props.theme.hpx(200) : props.theme.hpx(340)};
  margin-bottom: ${hpx(10)};
`;
