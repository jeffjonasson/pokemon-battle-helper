import React, { useEffect, useState } from 'react';
import { Autocomplete, Paper, TextField } from '@mui/material';
import Pokedex from 'pokedex-promise-v2';
import './App.css';
import Footer from './Components/Footer';
import {
  pokemonNameFormatter,
  pokemonTypesExtractor,
  defenseCalculator,
  pokemonTypeFormatter,
} from './helpers';
import { DefenseStats } from './DefenseStats';
import { ReactComponent as LeftArrow } from './assets/left-arrow.svg';
import Header from './Components/Header';

const App = () => {
  const initalState = {
    current: null,
    next: null,
    previous: null,
  };
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon, setPokemon] = useState(initalState);
  const P = new Pokedex();
  const interval = {
    limit: 898,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    P.getPokemonsList(interval).then((response) => {
      setPokemonList(response.results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPokemonData = (url) => {
    const trimmedUrl = url.substring(19);
    P.getResource(trimmedUrl).then((response) => {
      const index = pokemonList.findIndex((e) => e.url === url);
      const next = index + 1 > interval.limit ? null : pokemonList[index + 1];
      const previous = index - 1 < 0 ? null : pokemonList[index - 1];
      setPokemon({ current: response, next, previous });
    });
  };

  const onChange = (event, newValue) => {
    if (newValue) {
      fetchPokemonData(newValue.url);
    } else setPokemon(initalState);
  };

  return (
    <div className='App'>
      <div className='Content'>
        <Header />
        <div className='InputFieldWrapper'>
          <div className='InputField'>
            <Autocomplete
              freeSolo
              blurOnSelect
              onChange={onChange}
              disablePortal
              options={pokemonList.map((e) => ({
                label: pokemonNameFormatter(e.name),
                url: e.url,
              }))}
              renderInput={(params) => (
                <>
                  <Paper
                    component='form'
                    sx={{
                      p: '6px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <TextField
                      fullWidth
                      {...params}
                      label='Search for a Pokémon'
                    />
                  </Paper>
                </>
              )}
            />
          </div>
        </div>
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
      </div>
      <Footer />
    </div>
  );
};

export default App;
