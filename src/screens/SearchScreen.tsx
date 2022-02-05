import {View, Platform, Text, FlatList, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import SearchInput from '../components/SearchInput';
import PokemonCard from '../components/PokemonCard';
import Loading from '../components/Loading';
import {styles} from '../themes/appTheme';

const windowWidth = Dimensions.get('window').width;

export default function SearchScreen() {
  const {top} = useSafeAreaInsets();
  const {colors} = useTheme();
  const {isFetching, simplePokemons} = usePokemonSearch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState<SimplePokemon[]>([]);

  // Para filtrar los pokemones: (clase 269)
  useEffect(() => {
    // si está vacío:
    if (searchTerm.length === 0) {
      return setFilteredPokemons([]);
    }

    console.log(isNaN(Number(searchTerm)));

    // si hay input para buscar, filtrar el arreglo y regresarlo:
    if (isNaN(Number(searchTerm))) {
      // verifica es no es un número, entonces es texto:
      setFilteredPokemons(
        simplePokemons.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    } else {
      const pokemonIdResult = simplePokemons.find(
        item => item.id === searchTerm,
      );
      setFilteredPokemons(
        // hacemos una validación porque debemos regresar un arreglo (clase 270)
        pokemonIdResult ? [pokemonIdResult] : [],
      );
    }
  }, [searchTerm]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
      }}>
      <SearchInput
        // onDebounce={value => setSearchTerm(value)}
        onDebounce={setSearchTerm}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: windowWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 20,
        }}
      />

      <View
        style={{
          alignItems: 'center',
        }}>
        <FlatList
          data={filteredPokemons}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          showsVerticalScrollIndicator={false}
          // Header
          ListHeaderComponent={() => (
            <Text
              style={{
                ...styles.title,
                ...styles.globalPaddingHorizontal,
                color: colors.text,
                marginTop: top + 100,
                marginBottom: 20,
              }}>
              {searchTerm}
            </Text>
          )}
        />
      </View>
    </View>
  );
}
