const express = require("express");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt-nodejs");

const app = express();

// API callbacks
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const entry = require("./controllers/entry");
const home = require("./controllers/home");
const root = require("./controllers/root");

// Middlewares
app.use(express.json());
app.use(cors());

// Database connection
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "206207",
    database: "color_prediction_app",
  },
});

app.get("/", (req, res) => root.handleRoot(req, res, db));

// Signin
app.post("/signin", signin.handleSignin(bcrypt, db));

// Register
app.post("/register", register.handleRegister(bcrypt, db));

// Entries
app.put("/entry", (req, res) => entry.handleEntries(req, res, db));

// Home
app.post("/home", (req, res) => home.handleHome(req, res));

app.listen(process.env.PORT || 8000, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
