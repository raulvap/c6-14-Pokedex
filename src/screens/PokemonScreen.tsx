import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigations/Navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import PokemonDetails from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export default function PokemonScreen({navigation, route}: Props) {
  // Sacamos de los Props navigation y route. De Route sacamos los params: (clase 253)
  const {SimplePokemon, color} = route.params;

  const {name, id, picture} = SimplePokemon;
  const {top} = useSafeAreaInsets();

  const {isLoading, pokemon} = usePokemon(id);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          ...stylesComp.headerContainer,
          backgroundColor: color,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{...stylesComp.backButton, top: top + 5}}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" color="#D5DBDB" size={35} />
        </TouchableOpacity>

        <Text style={{...stylesComp.pokemonName, top: top + 50}}>
          {name.toUpperCase()} {'\n# ' + id}
        </Text>

        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={stylesComp.pokeball}
        />
        <FadeInImage uri={picture} style={stylesComp.pokemonImage} />
      </View>

      {isLoading ? (
        <View style={{...stylesComp.loadingIndicator}}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} color={color} />
      )}
    </View>
  );
}

const stylesComp = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'flex-start',
    left: 20,
  },

  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.6,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -18,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
