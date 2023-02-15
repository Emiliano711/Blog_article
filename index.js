require("dotenv").config();

const testConnection = require("./testConnection");
const createTables = require("./createTables");
const userSeeder = require("./seeders/userSeeder");
const articleSeeder = require("./seeders/articleSeeder");
const commentSeeder = require("./seeders/commentSeeder");
const passport = require("./passport.js");

const { sequelize, User, Article, Comment } = require("./models/index");

const express = require("express");
const app = express();
const APP_PORT = process.env.APP_PORT;
const routes = require("./routes");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

passport(app);

//iife
(async function () {
  await createTables(sequelize);
  await userSeeder(User);
  await articleSeeder(Article);
  await commentSeeder(Comment);
});

app.use(routes);

app.listen(APP_PORT, () => console.log(`Listening http://localhost:${APP_PORT}`));
