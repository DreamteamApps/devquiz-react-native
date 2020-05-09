import React, {createContext, useContext, useState, useEffect} from 'react';
import styles from '~/Utils/styles';
import {ThemeProvider} from 'styled-components';
import GameProvider from './GameContext';
import AuthProvider from './AuthContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Loading from '~/Components/Loading';
import {getMusicEnabled, setMusicEnabled} from '~/Storage/AppStorage';

export const AppContext = createContext();

export default function AppProvider({children}) {
  const [musicStatus, setMusicStatus] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkMusicEnabled();
  }, []);

  const checkMusicEnabled = async () => {
    const music = await getMusicEnabled();
    setMusicStatus(music);
  };

  const changeMusicStatus = async () => {
    const newStatus = !musicStatus;
    await setMusicEnabled(newStatus);
    setMusicStatus(newStatus);
  };

  return (
    <AppContext.Provider
      value={{loading, setLoading, musicStatus, changeMusicStatus}}>
      <ThemeProvider theme={styles}>
        <SafeAreaProvider>
          <AuthProvider>
            {loading && <Loading />}
            <GameProvider>{children}</GameProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  return context;
}
