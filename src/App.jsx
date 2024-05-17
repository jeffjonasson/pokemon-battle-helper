import React, { useEffect, useState } from 'react';
import Pokedex from 'pokedex-promise-v2';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import InputField from './Components/InputField';
import PokemonDisplay from './Components/PokemonDisplay';

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
        <InputField onChange={onChange} pokemonList={pokemonList} />
        <PokemonDisplay pokemon={pokemon} fetchPokemonData={fetchPokemonData} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
