import React from 'react';

import Navigation from './src/Navigation';
import {ThemeProvider} from 'styled-components';
import colors from './src/Utils/styles/colors';
import {StatusBar} from 'react-native';
export default function app() {
  return (
    <ThemeProvider theme={colors}>
      <StatusBar backgroundColor={colors.primary} barStyle={colors.themeType} />
      <Navigation />
    </ThemeProvider>
  );
}
