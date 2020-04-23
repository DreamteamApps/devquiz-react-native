import React from 'react';

import Navigation from './src/Navigation';
import {ThemeProvider} from 'styled-components';
import styles from './src/Utils/styles';
import {StatusBar} from 'react-native';
export default function app() {
  return (
    <ThemeProvider theme={styles}>
      <StatusBar backgroundColor={styles.colors.primary} barStyle={styles.colors.themeType} />
      <Navigation />
    </ThemeProvider>
  );
}
