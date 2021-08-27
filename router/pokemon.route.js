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
    if (pokemons === null) res.sendStatus(404);
    else res.status(200).json(pokemons);
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

router.delete("/:id", async (req, res, next) => {
  try {
    const pokeId = req.params.id;
    const numberofDelRecords = await db.Pokemon.destroy({
      where: {
        id: pokeId,
      },
    });
    console.log("Number of del: " + numberofDelRecords);
    res.status(200).json(numberofDelRecords);
  } catch (error) {
    next(error);
  }
});

//Update method
router.post("/update/:id", async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const data = req.body;

    const [count, updateObject] = await db.Pokemon.update(data, {
      returning: true,
      raw: true,
      where: { id: requestId },
    });

    console.log("No. of updates: " + count);
    console.log(updateObject);
    res.status(200).send("No. of records updated: " + count);
  } catch (error) {
    next(error);
  }
});

//Sample Put code as replacement for above Update
// router.put("/:id", async (req, res, next) => {
//   try {
//     const pokemonId = req.params.id;
//     const pokemonToUpdate = await db.Pokemon.findByPk(pokemonId);

//     if (pokemonToUpdate === null) return res.sendStatus(404);
//     await pokemonToUpdate.update(req.body);

//     res.json(pokemonToUpdate);
//   } catch (error) {
//     next(error);
//   }
// });
module.exports = router;
