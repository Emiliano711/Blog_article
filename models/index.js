const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize("article_db", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

const Author = require("./Author")(sequelize, Model, DataTypes);
const Article = require("./Article")(sequelize, Model, DataTypes)

//Asociacion
// Un Autor puede tener muchos articulos 
Author.hasMany(Article);

module.exports = {sequelize, Author, Article}