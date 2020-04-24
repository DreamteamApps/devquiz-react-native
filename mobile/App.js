import React from 'react';

import Navigation from './src/Navigation';
import {ThemeProvider} from 'styled-components';
import GameProvider from './src/Contexts/GameContext';
import AuthProvider from './src/Contexts/AuthContext';
import styles from './src/Utils/styles';
import {StatusBar} from 'react-native';
export default function app() {
  return (
    <ThemeProvider theme={styles}>
      <StatusBar
        backgroundColor={styles.colors.primary}
        barStyle={styles.colors.themeType}
      />
      <AuthProvider>
        <GameProvider>
          <Navigation />
        </GameProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
