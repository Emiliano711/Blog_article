const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController")
//Ruta HOME
router.get("/", articleController.showHome);

router.get("/create", articleController.createArticleForm);

router.get("/api/blog", articleController.index);

router.get("/articles/:id", articleController.showSingleArticle)


