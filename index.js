require("dotenv").config();

const { sequelize, Author, Article, Comment } = require("./models/index");
const testConnection = require("./testConnection");
const createTables = require("./createTables");
const authorSeeder = require("./seeders/authorSeeder");
const articleSeeder = require("./seeders/articleSeeder");
const commentSeeder = require("./seeders/commentSeeder");

const express = require("express");
const app = express();
const APP_PORT = process.env.APP_PORT;

app.use(express.static("public"));

app.set("view engine", "ejs");

//iife
(async function () {
  await createTables(sequelize);
  await authorSeeder(Author);
  await articleSeeder(Article);
  await commentSeeder(Comment);
})();

app.get("/api/blog", async (req, res) => {
  const articles = await Article.findAll({
    include: Author,
    order: [["id", "DESC"]],
  });
  res.json(articles);
});

app.get("/", async (req, res) => {
  const articles = await Article.findAll({
    include: Author,
    order: [["id", "DESC"]],
  });
  return res.render("home", {articles});
});

app.get("/articles/:id", async (req, res) => {
  const article = await Article.findByPk(req.params.id, {
    include: Author,
  })
  return res.render("articles", {article});
});

app.listen(APP_PORT, () =>
  console.log(`Listening http://localhost:${APP_PORT}`)
);
