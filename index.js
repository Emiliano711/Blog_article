require("dotenv").config();
const db = require("./db");

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  return res.render("home", { articles });
});

app.get("/articles/:id", async (req, res) => {
  const article = await Article.findByPk(req.params.id, {
    include: Author,
    Comment,
  });
  res.render("articles", { article });
});

app.post("articles/:id", async (req, res) => {
const comment = await Comment.findByPk(req.params.id)
 commen = req.body.comment;
 name = req.body.name;
await comment.save();
res.redirect("/articles")
});

app.get("/admin", async (req, res) => {
  //ruta de admin
  const articles = await Article.findAll({
    include: Author, // incluyo author para la columna que trae firstname & lastname
  });
  return res.render("admin", { articles });
});

app.get("/admin/edit/:id", async (req, res) => {
  const article = await Article.findByPk(req.params.id);
  res.render("editForm", { article });
});

app.post("/admin/edit/:id", async (req, res) => {
  const artEdit = await Article.findByPk(req.params.id);
  artEdit.title = req.body.title;
  artEdit.content = req.body.content;
  await artEdit.save();
  res.redirect("/admin");
});

app.get("/admin/delete/:id", async (req, res) => {
  id = req.params.id;
  await Article.destroy({
    where: {
      id: id,
    },
  }).then((result) => {
    if (result) {
      res.redirect("/admin");
    } else {
      res.render("notFound");
    }
  });
});

app.get("/create", (req, res) => {
  return res.render("newArticle");
});

app.post("/create", async (req, res) => {
  await Article.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    title: req.body.title,
    content: req.body.content,
  });
  res.redirect("/admin");
});

app.listen(APP_PORT, () =>
  console.log(`Listening http://localhost:${APP_PORT}`)
);
