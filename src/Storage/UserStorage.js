import AsyncStorage from '@react-native-community/async-storage';

export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    // saving error
  }
};

export const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem('user');
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
};

export const savePushToken = async (pushToken) => {
  try {
    await AsyncStorage.setItem('pushToken', pushToken);
  } catch (e) {
    // saving error
  }
};
export const getPushToken = async () => {
  try {
    const value = await AsyncStorage.getItem('pushToken');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};
