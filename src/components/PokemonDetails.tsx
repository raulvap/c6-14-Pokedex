import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {PokemonFull} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
  color: string;
}

export default function PokemonDetails({pokemon, color}: Props) {
  return (
    <ScrollView style={{...StyleSheet.absoluteFillObject}}>
      <View style={{...stylesComp.container, padding: 20}}>
        <Text style={{...stylesComp.title, color: color}}>Types</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.types.map(item => {
            return (
              <Text
                key={item.type.name}
                style={{...stylesComp.regularText, marginRight: 10}}>
                {item.type.name}
              </Text>
            );
          })}
        </View>
        <Text style={{...stylesComp.title, color: color}}>Weight</Text>
        <Text style={stylesComp.regularText}>{pokemon.weight} lb</Text>
      </View>

      <View style={{padding: 20}}>
        <Text style={{...stylesComp.title, color: color}}>Basic Skills</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.abilities.map(item => {
            return (
              <Text
                key={item.ability.name}
                style={{...stylesComp.regularText, marginRight: 10}}>
                {item.ability.name}
              </Text>
            );
          })}
        </View>
      </View>

      <View style={{padding: 20}}>
        <Text style={{...stylesComp.title, color: color}}>Movements</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {pokemon.moves.map(item => {
            return (
              <Text
                key={item.move.name}
                style={{...stylesComp.regularText, marginRight: 10}}>
                {item.move.name}
              </Text>
            );
          })}
        </View>
      </View>

      <View style={{padding: 20}}>
        <Text style={{...stylesComp.title, color: color}}>Stats</Text>
        <View>
          {pokemon.stats.map((item, index) => {
            return (
              <View
                key={item.stat.name + index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 30,
                }}>
                <Text style={{...stylesComp.regularText, marginRight: 10}}>
                  {item.stat.name}
                </Text>

                <Text style={{...stylesComp.regularText, marginRight: 10}}>
                  {item.base_stat}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <View>
        <Text style={{...stylesComp.title, color: color, padding: 20}}>
          Sprites
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginBottom: 70}}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={stylesComp.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={stylesComp.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={stylesComp.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={stylesComp.basicSprite}
        />
      </ScrollView>

      {/* <Text style={{color: 'grey'}}>{JSON.stringify(pokemon, null, 3)}</Text> */}
    </ScrollView>
  );
}

const stylesComp = StyleSheet.create({
  container: {
    marginTop: 400,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },
  regularText: {
    fontSize: 18,
    color: '#797D7F',
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});
