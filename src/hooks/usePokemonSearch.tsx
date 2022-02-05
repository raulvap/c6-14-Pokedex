import {useEffect, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [simplePokemons, setSimplePokemons] = useState<SimplePokemon[]>([]);

  const loadPokemons = async () => {
    const response = await pokemonApi.get<PokemonPaginatedResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1200',
    );

    mapPokemonList(response.data.results);
    await setTimeout(() => {
      setIsFetching(false);
    }, 500);
  };

  //   2da función: modificar los resultados
  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({url, name}) => {
      const urlParts = url.split('/');
      // del arreglo que partimos, sacamos la penúltima posición que es nuestro índice
      const id = urlParts[urlParts.length - 2];
      //   console.log(id);
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {id, name, picture};
    });

    setSimplePokemons(newPokemonList);
  };

  //   3ra función: useEffect para cada que se llame la función
  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    isFetching,
    simplePokemons,
  };
};
