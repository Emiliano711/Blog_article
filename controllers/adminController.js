const { sequelize, Author, Article, Comment } = require("../models/index");

const panelAdmin = async (req, res) => {
  //ruta de admin
  const articles = await Article.findAll({
    include: Author, // incluyo author para la columna que trae firstname & lastname
  });
  return res.render("admin", { articles });
};

const editForm = async (req, res) => {
  const article = await Article.findByPk(req.params.id);
  res.render("editForm", { article });
};

const editFormData = async (req, res) => {
  const artEdit = await Article.findByPk(req.params.id);
  artEdit.title = req.body.title;
  artEdit.content = req.body.content;
  await artEdit.save();
  res.redirect("/admin");
};

const destroy = async (req, res) => {
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
};

const newAuthorForm = async (req, res) => {
  return res.render("newAuthor");
};

const newAuthorFormData = async (req, res) => {
  const newAuthor = await Author.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  return res.redirect("/admin");
};

module.exports = {
  panelAdmin,
  editForm,
  editFormData,
  destroy,
  newAuthorForm,
  newAuthorFormData,
};
