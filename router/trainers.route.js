const express = require("express");
const db = require("../db/models/index.js");

const router = express.Router();

//Get all
router.get("/", async (req, res, next) => {
  try {
    const trainers = await db.Trainer.findAll();

    res.status(200).json(trainers);
  } catch (error) {
    next(error);
  }
});

// Add POST /trainers route
router.post("/", async (req, res, next) => {
  try {
    const newTrainer = await db.Trainer.create(req.body);
    res.send(newTrainer);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//Update method
// router.post("/update/:username", async (req, res, next) => {
//   try {
//     const username = req.params.username;
//     const data = req.body;
//     const trainerToUpdate = await db.Trainer.findAll({
//       where: { username: username },
//     });
//     console.log(trainerToUpdate);
//     if (trainerToUpdate === null) res.sendStatus(404);
//     else {
//       //   const [count, updateObject] = await db.Trainer.update(data, {
//       //     returning: true,
//       //     raw: true,
//       //     where: { username: username },
//       //   });
//       const [count, updateObject] = await db.Trainer.update(
//         { password: data.password },
//         {
//           returning: true,
//           raw: true,
//           where: { username: username },
//         }
//       );

//       res.status(200).send(updateObject);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
