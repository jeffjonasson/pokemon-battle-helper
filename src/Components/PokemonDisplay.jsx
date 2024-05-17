import React from 'react';
import {
  defenseCalculator,
  pokemonIdFormatter,
  pokemonNameFormatter,
  pokemonTypeFormatter,
  pokemonTypesExtractor,
} from '../helpers';
import { ReactComponent as LeftArrow } from '../assets/left-arrow.svg';
import { DefenseStats } from './DefenseStats';

import './PokemonDisplay.css';

const PokemonDisplay = ({ pokemon, fetchPokemonData }) => {
  return (
    <>
      {pokemon.current && (
        <div>
          <div className='PrevAndNextPokemon'>
            {pokemon.previous && (
              <div className='PreviousPokemon'>
                <button
                  className='SelectButton'
                  onClick={() => fetchPokemonData(pokemon.previous.url)}
                >
                  <span>{pokemonNameFormatter(pokemon.previous.name)}</span>
                  <div className='LeftArrow'>
                    <LeftArrow />
                  </div>
                </button>
              </div>
            )}
            {pokemon.next && (
              <div className='NextPokemon'>
                <button
                  className='SelectButton'
                  onClick={() => fetchPokemonData(pokemon.next.url)}
                >
                  <span>{pokemonNameFormatter(pokemon.next.name)}</span>
                  <div className='RightArrow'>
                    <LeftArrow />
                  </div>
                </button>
              </div>
            )}
          </div>
          <div className='PokemonName'>
            <span>{pokemonNameFormatter(pokemon.current.name)}</span>
          </div>
          <div className='PokemonId'>
            <span>#{pokemonIdFormatter(pokemon.current.id)}</span>
          </div>
          <img alt='Pokemon' src={pokemon.current.sprites.front_default} />
          <div className='PokemonType'>
            <span>
              {pokemonTypeFormatter(pokemonTypesExtractor(pokemon.current))}
            </span>
          </div>
          <div>
            <DefenseStats
              defenseStats={defenseCalculator(
                pokemonTypesExtractor(pokemon.current)
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonDisplay;
