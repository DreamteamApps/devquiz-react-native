import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Main from '../Screens/Main';
import ModeSelect from '../Screens/ModeSelect';
import WaitingRoom from '../Screens/WaitingRoom';
import JoinRoom from '../Screens/JoinRoom';
import Game from '../Screens/Game';
import Result from '../Screens/Result';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" headerMode="none">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="ModeSelect" component={ModeSelect} />
        <Stack.Screen name="WaitingRoom" component={WaitingRoom} />
        <Stack.Screen name="JoinRoom" component={JoinRoom} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
