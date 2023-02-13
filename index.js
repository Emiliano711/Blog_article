require("dotenv").config();
const formidable = require("formidable");

const { sequelize, Author, Article, Comment } = require("./models/index");
// const testConnection = require("./testConnection");
// const createTables = require("./createTables");
// const authorSeeder = require("./seeders/authorSeeder");
// const articleSeeder = require("./seeders/articleSeeder");
// const commentSeeder = require("./seeders/commentSeeder");

const express = require("express");
const app = express();
const APP_PORT = process.env.APP_PORT;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

//iife
// (async function () {
//   await createTables(sequelize);
//   await authorSeeder(Author);
//   await articleSeeder(Article);
//   await commentSeeder(Comment);
// })();

const form = formidable ({
  multiples: true, 
  uploadDir: __dirname + "/public/img/",
  keepExtensions: true
});

app.get("/api/blog", async (req, res) => {
  const articles = await Article.findAll({
    include: Author,
    order: [["id", "DESC"]],
  });
  res.json(articles);
});

app.get("/create/newAuthor", async (req, res) => {
  return res.render("newAuthor");
});

app.post("/create/newAuthor", async (req, res) => {
  const newAuthor = await Author.create({
    AuthorId: req.body.authorId,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  });
  return res.redirect("/admin")
})

app.get("/", async (req, res) => {
  const articles = await Article.findAll({
    include: Author,
    order: [["id", "DESC"]],
  })
  console.log(articles);
  return res.render("home", { articles });
});

app.get("/articles/:id", async (req, res) => {
  const article = await Article.findByPk(req.params.id, {
    include: [Author, Comment]
  });
  const comments = await Comment.findAll({
    where: {
      ArticleId: req.params.id
    },
    include: Author
  })
  const author = await Author.findAll()
  res.render("articles", { article, comments, author });
});

app.post("/comments/:id", async (req, res) => {
await Comment.create({
  content: req.body.content,
  AuthorId: req.body.author,
  ArticleId: req.params.id,
 })
res.redirect(`/articles/${req.params.id}`)
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
  
  form.parse(req, async (err, fields, files) => {
    const newUser = await Article.create({
       AuthorId: fields.idUser,
       firstname: fields.firstname,
       lastname: fields.lastname,
       title: fields.title,
       content: fields.content,
       image: files.image.newFilename,
     });
  })

  return res.redirect("/admin");
});

app.listen(APP_PORT, () =>
  console.log(`Listening http://localhost:${APP_PORT}`)
);
