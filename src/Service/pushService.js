import React, {useEffect} from 'react';
import OneSignal from 'react-native-onesignal';
import {savePushToken} from '~/Storage/UserStorage';
import {useNavigation} from '@react-navigation/native';
import {ONESIGNAL_APP_KEY} from '~/config';

export default function OneSignalConfig() {
  const navigation = useNavigation();

  useEffect(() => {
    startOnesignal();
  }, []);

  const startOnesignal = () => {
    OneSignal.init(ONESIGNAL_APP_KEY, {
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });

    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener('opened', onPushOpened);
    OneSignal.addEventListener('ids', (device) => {
      if (device && device.userId) {
        savePushToken(device.userId);
      }
    });
  };

  const onPushOpened = ({notification}) => {
    console.log('matchCode', notification.payload?.additionalData?.matchCode);
    let roomCode = notification?.payload?.additionalData?.matchCode;
    roomCode && navigation.navigate('JoinRoom', {roomCode: roomCode});
  };

  return <></>;
}
