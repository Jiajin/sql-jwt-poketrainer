const express = require("express");
const router = express.Router();

const db = require("../db/models/index.js");
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
  try {
    const pokemons = await db.Pokemon.findAll();

    res.status(200).json(pokemons);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const pokemons = await db.Pokemon.findByPk(req.params.id);

    res.status(200).json(pokemons);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const created = await db.Pokemon.create(req.body);

    // The recommended way to log an instance, but do note that this might still log sensitive data stored in database. Need processing.
    console.log(created.toJSON());

    res.status(201).json(created.toJSON());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
