//
const { sequelize, Author, Article, Comment } = require("./models/index");

const showHome = async (req, res) => {
    const articles = await Article.findAll({
      include: Author,
      order: [["id", "DESC"]],
    })
    console.log(articles);
    return res.render("home", { articles });
  };

  const createArticleForm =  (req, res) => {
    return res.render("newArticle");
  };
//recibiendo el dato del Formulario
  const postDataArticle = async (req, res) => {
  
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
  };
// index articles formato json
  const index = async (req, res) => {
    const articles = await Article.findAll({
      include: Author,
      order: [["id", "DESC"]],
    });
    res.json(articles);
  };

  const showSingleArticle = async (req, res) => {
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
  };

  module.exports = {
    showHome,
    createArticleForm,
    postDataArticle,
    index,
    showSingleArticle
  }