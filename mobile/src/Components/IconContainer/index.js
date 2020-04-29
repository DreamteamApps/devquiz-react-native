import React from 'react';

import {Container, Avatar, Title} from './styles';

export default function IconContainer({icon, title, children}) {
  return (
    <Container>
      {icon && <Avatar source={icon} />}
      <Title>{title}</Title>
      {children}
    </Container>
  );
}
