import React, {useEffect, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import ImageColors from 'react-native-image-colors';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('#2980B9');

  const navigation = useNavigation();

  // Usaremos un useRef para saber si está montado o desmontado: (clase 252)
  const isMounted = useRef(true);

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {
      fallback: '#2980B9',
    }).then(colors => {
      // si el componente no está montado, no hace nada:
      if (!isMounted.current) return;

      colors.platform === 'ios'
        ? setBgColor(colors.background || '#2980B9')
        : setBgColor(colors.dominant || '#2980B9');
    });

    // Esta función se dispara cuando el componente se va a desmontar: (clase 252)
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate<any>('PokemonScreen', {
          SimplePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View
        style={{
          ...stylesComp.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        {/* Nombre y Id: */}
        <View>
          <Text style={{...stylesComp.namePokemon}}>
            {pokemon.name.toUpperCase()} {'\n#' + pokemon.id}
          </Text>
        </View>
        <View style={stylesComp.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={stylesComp.pokebolaImg}
          />
        </View>
        <FadeInImage
          uri={pokemon.picture}
          style={{
            width: 100,
            height: 100,
            position: 'absolute',
            right: -7,
            bottom: -5,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const stylesComp = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  pokebolaContainer: {
    // backgroundColor: 'red',
    position: 'absolute',
    width: 100,
    height: 100,
    bottom: 0,
    right: 0,
    borderRadius: 10,

    overflow: 'hidden',
    // right: -20,
    // opacity: 0.4,
  },

  pokebolaImg: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -20,
    right: -20,
    opacity: 0.4,
  },
  namePokemon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 10,
    left: 10,
  },
});

export default PokemonCard;
