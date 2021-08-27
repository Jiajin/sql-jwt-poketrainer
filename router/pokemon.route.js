const express = require("express");
const router = express.Router();

const { findAllPokemon } = require("../crud/read");

router.get("/", async (req, res, next) => {
  try {
    const pokemons = await findAllPokemon();

    res.json(pokemons);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
