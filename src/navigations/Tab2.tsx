import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import PokemonScreen from '../screens/PokemonScreen';
import SearchScreen from '../screens/SearchScreen';
import {RootStackParams} from './Navigation';

// Clase 271: para que Search se mantenga en ese Tab:
const Tab2 = createStackNavigator<RootStackParams>();

export const Tab2Navigation = () => {
  return (
    <View style={{flex: 1}}>
      <Tab2.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{headerShown: false}}>
        <Tab2.Screen name="HomeScreen" component={SearchScreen} />
        <Tab2.Screen name="PokemonScreen" component={PokemonScreen} />
      </Tab2.Navigator>
    </View>
  );
};
