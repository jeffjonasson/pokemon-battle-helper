import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { pokemonNameFormatter } from '../helpers';
import './InputField.css';

const InputField = ({ onChange, pokemonList }) => {
  return (
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
          sx={{
            backgroundColor: '#FFF',
            padding: '8px',
            borderRadius: '4px',
          }}
          renderInput={(params) => (
            <TextField fullWidth {...params} label='Search for a Pokémon' />
          )}
        />
      </div>
    </div>
  );
};

export default InputField;
