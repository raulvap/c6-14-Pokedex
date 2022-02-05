import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import PokemonCard from '../components/PokemonCard';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';

import {styles} from '../themes/appTheme';

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {colors} = useTheme();

  const {simplePokemons, loadPokemons} = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />

      <View
        style={{
          alignItems: 'center',
        }}>
        <FlatList
          data={simplePokemons}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          // Header
          ListHeaderComponent={() => (
            <Text
              style={{
                ...styles.title,
                ...styles.globalPaddingHorizontal,
                color: colors.text,
                top: top + 20,
                marginBottom: top + 45,
              }}>
              Poke Dex
            </Text>
          )}
          // infinite scroll, para la paginación
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} size={20} color="grey" />
          }
        />
      </View>
    </>
  );
};

export default HomeScreen;
