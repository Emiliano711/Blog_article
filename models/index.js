const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    logging: false, // Para evitar que TablePlus envie los mensajes de creacion
  }
);

const Author = require("./Author")(sequelize, Model, DataTypes);
const Article = require("./Article")(sequelize, Model, DataTypes);
const Comment = require("./Comment")(sequelize, Model, DataTypes);

//Asociacion
Author.hasMany(Article);
Article.belongsTo(Author);
Article.hasMany(Comment);
Comment.belongsTo(Article);
Author.hasMany(Comment);
Comment.belongsTo(Author);

module.exports = { sequelize, Author, Article, Comment };
