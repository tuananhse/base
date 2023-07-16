/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Router from './src/routes';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import './src/locales';
import {StoreProvider} from './src/stores';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={backgroundStyle}>
          <StoreProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <Router />
          </StoreProvider>
        </SafeAreaView>
      </ApplicationProvider>
    </>
  );
}

export default App;
