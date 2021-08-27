require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./db/models/index");

// sync will make sure the that the database is connected and the models are properly setup on app startup
db.sequelize.sync();

const app = express();
app.use(express.json());

app.use(cookieParser());

const pokemonRouter = require("./router/pokemon.route");
app.use("/pokemon/", pokemonRouter);
const trainersRouter = require("./router/trainers.route");
app.use("/trainers", trainersRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// default error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
