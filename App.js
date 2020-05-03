import React, {useEffect} from 'react';

import Navigation from './src/Navigation';
import styles from './src/Utils/styles';
import {StatusBar} from 'react-native';
import AppContext from '~/Contexts/AppContext';
import {startOnesignal} from './src/Service/pushService';

export default function app() {
  useEffect(() => {
    startOnesignal();
  }, []);

  return (
    <AppContext>
      <StatusBar
        backgroundColor={styles.colors.primary}
        barStyle={styles.colors.themeType}
      />
      <Navigation />
    </AppContext>
  );
}
