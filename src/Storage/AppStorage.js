import AsyncStorage from '@react-native-community/async-storage';

export const setMusicEnabled = async (status) => {
  try {
    await AsyncStorage.setItem('musicEnabled', JSON.stringify(status));
  } catch (e) {
    // saving error
  }
};
export const getMusicEnabled = async () => {
  try {
    const value = await AsyncStorage.getItem('musicEnabled');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return true;
    }
  } catch (e) {
    // error reading value
  }
};
