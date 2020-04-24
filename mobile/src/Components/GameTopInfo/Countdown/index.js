import React from 'react';

import {Container, Text} from './styles';

export default function Countdown({value}) {
  return (
    <Container>
      <Text>{value}</Text>
    </Container>
  );
}
