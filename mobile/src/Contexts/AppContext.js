import React from 'react';

import styles from '~/Utils/styles';
import {ThemeProvider} from 'styled-components';
import GameProvider from './GameContext';
import AuthProvider from './AuthContext';
export default function AppContext({children}) {
  return (
    <ThemeProvider theme={styles}>
      <AuthProvider>
        <GameProvider>{children}</GameProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
