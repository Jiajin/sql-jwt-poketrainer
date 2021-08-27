const express = require("express");
const db = require("../db/models/index.js");
const { Op } = require("sequelize");

const { auth } = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const createJWTToken = require("../config/jwt");

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

router.get("/search/:username", auth, async (req, res, next) => {
  try {
    const username = req.params.username;
    // [db.Sequelize.Op.iLike] allows you to do case-insensitive + partial querying
    // e.g. "Sa" will return Samantha, Samuel..
    const trainer = await db.Trainer.findAll({
      where: { username: { [Op.iLike]: "%" + username + "%" } },
      attributes: {
        exclude: ["password"],
      },
    });
    res.send(trainer);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//login
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const trainer = await db.Trainer.findOne({
      where: { username },
      attributes: { include: ["password"] },
    });

    // return if Trainer does not exist
    // message returned is intentionally vague for security reasons
    if (!trainer) {
      return res.status(422).json({ message: "Invalid username or password." });
    }

    // check if user input password matches hashed password in the db
    const result = await bcrypt.compare(password, trainer.password);

    if (!result) {
      throw new Error("Login failed");
    }

    const token = createJWTToken(trainer.username);

    // calculation to determine expiry date - this is up to your team to decide
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = oneDay * 7;
    const expiryDate = new Date(Date.now() + oneWeek);

    // you are setting the cookie here, and the name of your cookie is `token`
    res.cookie("token", token, {
      expires: expiryDate,
      httpOnly: false, // client-side js cannot access cookie info
      secure: true, // use HTTPS
    });

    res.send("You are now logged in!");
  } catch (err) {
    if (err.message === "Login failed") {
      err.statusCode = 400;
    }
    next(err);
  }
});

//logout
router.post("/logout", (req, res) => {
  // clears the 'token' cookie from your browser
  res.clearCookie("token").send("You are now logged out!");
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
