require("dotenv").config();
const formidable = require("formidable");

// const testConnection = require("./testConnection");
// const createTables = require("./createTables");
// const authorSeeder = require("./seeders/authorSeeder");
// const articleSeeder = require("./seeders/articleSeeder");
// const commentSeeder = require("./seeders/commentSeeder");

const express = require("express");
const app = express();
const APP_PORT = process.env.APP_PORT;
const routes = require("./routes");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const form = formidable ({
  multiples: true, 
  uploadDir: __dirname + "/public/img/",
  keepExtensions: true
});

//iife
// (async function () {
//   await createTables(sequelize);
//   await authorSeeder(Author);
//   await articleSeeder(Article);
//   await commentSeeder(Comment);
// })();

app.use(routes);

app.listen(APP_PORT, () =>
  console.log(`Listening http://localhost:${APP_PORT}`)
);
