import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Main from '../Screens/Main';
import ModeSelect from '../Screens/ModeSelect';
import WaitingRoom from '../Screens/WaitingRoom';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" headerMode="none">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="ModeSelect" component={ModeSelect} />
        <Stack.Screen name="WaitingRoom" component={WaitingRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
