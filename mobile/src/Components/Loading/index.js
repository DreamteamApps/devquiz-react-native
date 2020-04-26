import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import {Container} from './styles';

export default function Loading() {
  return (
    <Container>
      <ActivityIndicator size="small" />
    </Container>
  );
}
