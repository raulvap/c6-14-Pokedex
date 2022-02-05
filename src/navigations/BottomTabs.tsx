import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import {Navigation} from './Navigation';
import {Tab2Navigation} from './Tab2';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'white'}}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          paddingBottom: Platform.OS === 'android' ? 10 : 2,
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderWidth: 0,
          elevation: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Navigation}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={25} />,
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={Tab2Navigation}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="search" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
