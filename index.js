const { sequelize, Author, Article } = require("./models/index")
const testConnection = require("./testConnection");
const createTables = require("./createTables");
const authorSeeder = require("./seeders/authorSeeder");
const articleSeeder = require("./seeders/articleSeeder");

const express = require("express");
const app = express();

(async function () {
  await createTables(sequelize);
  await authorSeeder(Author);
  await articleSeeder(Article);
})();

app.get("/", async (req, res) => {
  const author = await Author.findAll();
  res.json(author);
});

app.listen(8000, () => console.log("Listening http://localhost:8000"));
