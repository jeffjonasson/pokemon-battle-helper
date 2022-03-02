import React, { useEffect, useState } from "react";
import { Autocomplete, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pokedex from "pokedex-promise-v2";
import "./App.css";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const P = new Pokedex();
  const interval = {
    limit: 50,
  };

  useEffect(() => {
    P.getPokemonsList(interval).then((response) => {
      setPokemonList(response.results);
    });
  });

  const fetchPokemonData = (url) => {
    console.log("url", url);
    const trimmedUrl = url.substring(19);
    P.getResource(trimmedUrl).then((response) => {
      setPokemon(response);
    });
  };

  const onChange = (event, newValue) => {
    fetchPokemonData(newValue.url);
  };

  const pokemonNameFormatter = (name) => {
    const spacedName = name.split("-").join(" ");
    return spacedName.replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Pokémon Battle Helper</p>
      </header>
      <div>
        <Autocomplete
          freeSolo
          onChange={onChange}
          disablePortal
          options={pokemonList.map((e) => ({
            label: pokemonNameFormatter(e.name),
            url: e.url,
          }))}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <TextField fullWidth {...params} label="Search for a pokémon" />
              </Paper>
            </>
          )}
        />
        {pokemon && (
          <div>
            <img alt="Pokemon" src={pokemon.sprites.front_default} />
            <p>{pokemonNameFormatter(pokemon.name)}</p>
            <p></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
