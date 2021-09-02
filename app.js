require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./db/models/index");

// sync will make sure the that the database is connected and the models are properly setup on app startup
db.sequelize.sync();

const app = express();
app.use(express.json());

app.use(cookieParser());
const path = require("path");
const apiRouter = express.Router();

const pokemonRouter = require("./router/pokemon.route");
const trainersRouter = require("./router/trainers.route");
//app.use("/pokemon/", pokemonRouter);
//app.use("/trainers", trainersRouter);
app.use("/api", apiRouter);
apiRouter.use("/pokemon", pokemonRouter);
apiRouter.use("/trainers", trainersRouter);

// allows us to deploy both front/backend to 1 Heroku app
app.use(express.static(path.resolve("client", "build")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve("client", "build", "index.html"))
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// default error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
