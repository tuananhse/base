import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AuthStack from './authRouter';
import RootStack from './mainRouter';
import HomeTab from './homeTab';
const Stack = createStackNavigator();
import Profile from '../views/Profile';
const router: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{headerShown: false}}
        />

        {/* <Stack.Screen
          name="Main"
          component={HomeTab}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default router;
