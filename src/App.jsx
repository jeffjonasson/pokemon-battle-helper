import React, { useEffect, useState } from "react";
import { Autocomplete, Paper, TextField } from "@mui/material";
import Pokedex from "pokedex-promise-v2";
import "./App.css";
import {
  pokemonNameFormatter,
  pokemonTypesExtractor,
  defenseCalculator,
  pokemonTypeFormatter,
} from "./helpers";
import { DefenseStats } from "./DefenseStats";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const P = new Pokedex();
  const interval = {
    limit: 898,
  };

  useEffect(() => {
    P.getPokemonsList(interval).then((response) => {
      setPokemonList(response.results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      event.target.blur();
    } else setPokemon(null);
  };

  return (
    <div className="App">
      <div className="Content">
        <header className="App-header">
          <h2>Pokémon Battle Helper</h2>
        </header>
        <div className="InputFieldWrapper">
          <div className="InputField">
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
                    <TextField
                      fullWidth
                      {...params}
                      label="Search for a pokémon"
                    />
                  </Paper>
                </>
              )}
            />
          </div>
        </div>
        {pokemon && (
          <div>
            <div className="PokemonName">
              <span>{pokemonNameFormatter(pokemon.name)}</span>
            </div>
            <img alt="Pokemon" src={pokemon.sprites.front_default} />
            <div className="PokemonType">
              <span>
                {pokemonTypeFormatter(pokemonTypesExtractor(pokemon))}
              </span>
            </div>
            <div>
              <DefenseStats
                defenseStats={defenseCalculator(pokemonTypesExtractor(pokemon))}
              />
            </div>
          </div>
        )}
      </div>
      <div className="Footer">
        <div>Created by Jeff Jonasson. © 2022</div>
        <div>
          Pokémon © 2002–2022 Pokémon. © 1995–2022 Nintendo/Creatures Inc./GAME
          FREAK inc. ™, ® and Pokémon character names are trademarks of
          Nintendo. No copyright or trademark infringement is intended in using
          Pokémon content on this page.
        </div>
      </div>
    </div>
  );
};

export default App;
