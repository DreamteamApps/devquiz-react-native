import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import {Container, Text} from './styles';

export default function CustomButton({children, onPress}) {
  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    </Container>
  );
}
