import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {Navigation} from './src/navigations/Navigation';
import {BottomTabs} from './src/navigations/BottomTabs';

const MyTheme = {
  dark: false,
  colors: {
    primary: '#2980B9',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      {/* <Navigation /> */}
      <BottomTabs />
    </NavigationContainer>
  );
};

export default App;
