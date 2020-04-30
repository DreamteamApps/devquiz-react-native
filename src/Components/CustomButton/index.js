import React from 'react';
import {TouchableOpacity} from 'react-native';

import {Container, Text} from './styles';

export default function CustomButton({
  children,
  onPress,
  onLongPress,
  containerStyle,
  disabled,
}) {
  return (
    <Container style={containerStyle} disabled={disabled}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        onLongPress={onLongPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    </Container>
  );
}
