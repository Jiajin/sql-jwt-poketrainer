const db = require("../db/models/index.js");

const { Op } = require("sequelize");

const findAllPokemon = async () => {
  const foundPokemons = await db.Pokemon.findAll();
  return foundPokemons;
};

module.exports = {
  findAllPokemon,
};
