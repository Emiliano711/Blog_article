require("dotenv").config();

const testConnection = require("./testConnection");
const createTables = require("./createTables");
const userSeeder = require("./seeders/userSeeder");
const articleSeeder = require("./seeders/articleSeeder");
const commentSeeder = require("./seeders/commentSeeder");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const { sequelize, User, Article, Comment } = require("./models/index");

const express = require("express");
const app = express();
const APP_PORT = process.env.APP_PORT;
const routes = require("./routes");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false, // Docs: "The default value is true, but using the default has been deprecated".
    saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
  }),
);
app.use(passport.session());

passport.use(
  new LocalStrategy(async function (username, password, cb) {
    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        console.log("Nombre de usuario no existe.");
        return cb(null, false, { message: "Credenciales incorrectas." });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log("La contraseña es inválida.");
        return cb(null, false, { message: "Credenciales incorrectas." });
      }
      console.log("Credenciales verificadas correctamente");
      return cb(null, user);
    } catch (error) {
      cb(error);
    }
  }),
);
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findByPk(id);
    cb(null, user); // Usuario queda disponible en req.user.
  } catch (err) {
    cb(err, user);
  }
});

//iife
(async function () {
  await createTables(sequelize);
  await userSeeder(User);
  await articleSeeder(Article);
  await commentSeeder(Comment);
});

app.use(routes);

app.listen(APP_PORT, () => console.log(`Listening http://localhost:${APP_PORT}`));
