import {useEffect, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {PokemonFull} from '../interfaces/pokemonInterfaces';

// Creamos un nuevo hook para obtener la información del pokemon
export const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull);

  const loadPokemonInfo = async () => {
    const response = await pokemonApi.get<PokemonFull>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );

    setPokemon(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemonInfo();
  }, []);

  return {
    isLoading,
    pokemon,
  };
};
