import React, {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
  const [isLoadingPokemons, setIsLoadingPokemons] = useState(true);
  const [simplePokemons, setSimplePokemons] = useState<SimplePokemon[]>([]);
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

  //   1ra función: llamar a la API
  const loadPokemons = async () => {
    setIsLoadingPokemons(true);
    // Llamado al API:
    const response = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    );

    // console.log(response.data);
    // Guardamos la siguiente página en el ref
    nextPageUrl.current = response.data.next;
    mapPokemonList(response.data.results);
    setIsLoadingPokemons(false);
  };

  //   2da función: modificar los resultados
  // Creamos una segunda función para transformar la data que recibimos: (clase 245)
  const mapPokemonList = (pokemonList: Result[]) => {
    // Creamos un nuevo arreglo temporal de tipo SimplePokemon
    const newPokemonList: SimplePokemon[] = pokemonList.map(({url, name}) => {
      const urlParts = url.split('/');
      // del arreglo que partimos, sacamos la penúltima posición que es nuestro índice
      const id = urlParts[urlParts.length - 2];
      //   console.log(id);
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {id, name, picture};
    });

    // Ahora vamos a acumular los pokemones, los que estaban más los de la nueva página:
    setSimplePokemons([...simplePokemons, ...newPokemonList]);
  };

  //   3ra función: useEffect para cada que se llame la función
  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    isLoadingPokemons,
    simplePokemons,
    loadPokemons,
  };
};
