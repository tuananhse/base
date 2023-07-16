import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import url from '../services/url';
import {TabNavigatorParamsList} from '../utils/appNavigation';
import colors from '../utils/colors';
import Profile from '../views/Profile';
import HomePage from '../views/HomePage';
// import ManageLoan from '../views/ManageLoan';
// import Setting from '../views/More';

const Tab = createBottomTabNavigator();
export type Props = {
  navigation: StackNavigationProp<TabNavigatorParamsList>;
  route: any;
};

const HomeTab: React.FC<Props> = ({navigation, route}) => {
  return (
    <Tab.Navigator
      initialRouteName={url.screen.homepage}
      screenOptions={({route}) => ({
        headerShown: false,
        showlable: false,
        keyboardHidesTabBar: true,
        style: {
          position: 'absolute',
          backgroundColor: 'white',
          borderTop: '3px solid black',
          paddingVertical: 5,
          height: 90,
        },
      })}>
      <Tab.Screen
        name={url.screen.homepage}
        component={HomePage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.containerIcon}>
                {/* <Image
                  source={
                    focused
                      ? require('../assets/icons/ic_botnav_home2.png')
                      : require('../assets/icons/ic_botnav_home1.png')
                  }
                  resizeMode="contain"
                  style={styles.icon}
                /> */}
                <Text style={focused ? styles.labelActive : styles.label}>
                  Trang chủ
                </Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name={url.screen.profile}
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.containerIcon}>
                {/* <Image
                  source={
                    focused
                      ? require('../assets/icons/ic_botnav_acc2.png')
                      : require('../assets/icons/ic_botnav_acc1.png')
                  }
                  resizeMode="contain"
                  style={styles.icon}
                /> */}
                <Text style={focused ? styles.labelActive : styles.label}>
                  Tài khoản
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  containerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  labelActive: {
    fontSize: 11,
    color: colors.primary,
  },
  label: {
    fontSize: 11,
    color: colors.gray,
  },
});
