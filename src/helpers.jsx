import * as rawData from "./data.json";

const types = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

export const pokemonNameFormatter = (name) => {
  const spacedName = name.split("-").join(" ");
  return spacedName.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
};

export const capitalizeFirstChar = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const pokemonTypesExtractor = (pokemon) => {
  return pokemon.types.map((e) => e.type.name);
};

export const defenseCalculator = (typesArr) => {
  if (typesArr.length === 1) {
    return rawData[typesArr[0]];
  } else {
    const t1 = rawData[typesArr[0]];
    const t2 = rawData[typesArr[1]];
    let multipledTypesObj = {};

    types.forEach((type) => {
      multipledTypesObj = { ...multipledTypesObj, [type]: t1[type] * t2[type] };
    });
    return multipledTypesObj;
  }
};
