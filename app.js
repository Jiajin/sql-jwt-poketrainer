const express = require("express");
const db = require("./db/models/index");
const app = express();
app.use(express.json());

// sync will make sure the that the database is connected and the models are properly setup on app startup
db.sequelize.sync();
const pokemonRouter = require("./router/pokemon.route");

app.use("/pokemon/", pokemonRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// default error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
