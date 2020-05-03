import OneSignal from 'react-native-onesignal';
import {savePushToken} from '~/Storage/UserStorage';

const startOnesignal = () => {
  OneSignal.init('96aa2b3c-b7a4-411c-a10a-0b14fe2c6d0a', {
    kOSSettingsKeyAutoPrompt: false,
    kOSSettingsKeyInAppLaunchURL: false,
    kOSSettingsKeyInFocusDisplayOption: 2,
  });
  OneSignal.addEventListener('received', onPushReceived);
  OneSignal.addEventListener('ids', (device) => {
    if (device && device.userId) {
      savePushToken(device.userId);
      //AsyncStorage.setItem('playerId', device.userId);
    }
  });
};
const onPushReceived = (notification) => {
  console.log(notification);
};

export {startOnesignal};
