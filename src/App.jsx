import React, { useEffect, useState } from "react";
import { Autocomplete, Paper, TextField } from "@mui/material";
import Pokedex from "pokedex-promise-v2";
import "./App.css";
import {
  capitalizeFirstChar,
  pokemonNameFormatter,
  pokemonTypesExtractor,
  defenseCalculator,
} from "./helpers";
import { DefenseStats } from "./DefenseStats";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const P = new Pokedex();
  const interval = {
    limit: 300,
  };

  useEffect(() => {
    P.getPokemonsList(interval).then((response) => {
      setPokemonList(response.results);
    });
  }, []);

  const fetchPokemonData = (url) => {
    const trimmedUrl = url.substring(19);
    P.getResource(trimmedUrl).then((response) => {
      setPokemon(response);
    });
  };

  const onChange = (event, newValue) => {
    if (newValue) {
      fetchPokemonData(newValue.url);
    } else setPokemon(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Pokémon Battle Helper</h2>
      </header>
      <div className="Content">
        <Autocomplete
          freeSolo
          onChange={onChange}
          disablePortal
          options={pokemonList.map((e) => ({
            label: pokemonNameFormatter(e.name),
            url: e.url,
          }))}
          renderInput={(params) => (
            <>
              <Paper
                component="form"
                sx={{
                  p: "6px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField fullWidth {...params} label="Search for a pokémon" />
              </Paper>
            </>
          )}
        />
        {pokemon && (
          <div>
            <h2>{pokemonNameFormatter(pokemon.name)}</h2>
            <img alt="Pokemon" src={pokemon.sprites.front_default} />
            <div>
              {pokemonTypesExtractor(pokemon).map((name) => (
                <span key={name}> {capitalizeFirstChar(name)}</span>
              ))}
            </div>
            <p>
              <DefenseStats
                defenseStats={defenseCalculator(pokemonTypesExtractor(pokemon))}
              />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
