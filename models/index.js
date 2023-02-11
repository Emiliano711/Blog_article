const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize("article_db", "root", "root", {
  dialect: "mysql",
  host: "localhost",
  logging: false, // Para evitar que TablePlus envie los mensajes de creacion de Tablas
});

const Author = require("./Author")(sequelize, Model, DataTypes);
const Article = require("./Article")(sequelize, Model, DataTypes);
const Comment = require("./Comment")(sequelize, Model, DataTypes);

//Asociacion
// Un Autor puede tener muchos articulos 
Author.hasMany(Article);
Article.belongsTo(Author);
Article.hasMany(Comment);
Comment.belongsTo(Article);
Author.hasMany(Comment);
Comment.belongsTo(Author);


module.exports = {sequelize, Author, Article, Comment}