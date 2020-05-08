import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Main from '../Screens/Main';
import Home from '../Screens/Home';
import WaitingRoom from '../Screens/WaitingRoom';
import JoinRoom from '../Screens/JoinRoom';
import Game from '../Screens/Game';
import Result from '../Screens/Result';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        headerMode="none"
        screenOptions={{gestureEnabled: false}}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WaitingRoom" component={WaitingRoom} />
        <Stack.Screen name="JoinRoom" component={JoinRoom} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
