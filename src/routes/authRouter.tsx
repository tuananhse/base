import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from '../views/Login';
import url from '../services/url';
import ForgotPassword from '../views/ForgotPassword';
import VerifyOTP from '../views/VerifyOTP';
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={url.screen.login}>
      <Stack.Screen name={url.screen.login} component={Login} />
      <Stack.Screen name={url.screen.forgot} component={ForgotPassword} />
      <Stack.Screen name={url.screen.verifyOtp} component={VerifyOTP} />
    </Stack.Navigator>
  );
};

export default AuthStack;
