import React from 'react';
import url from '../services/url';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomePage from '../views/HomePage';
import HomeTab from './homeTab';
import ProfilePage from '../views/Profile';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName={url.screen.mainApp}>
      <Stack.Screen name={url.screen.mainApp} component={HomeTab} />
      <Stack.Screen name={url.screen.home} component={HomePage} />
      <Stack.Screen name={url.screen.profile} component={ProfilePage} />
    </Stack.Navigator>
  );
};

export default RootStack;
