const express = require("express");
const router = express.Router();
const articleController = require("./controllers/articleController");
const commentController = require("./controllers/commentController");
const adminController = require("./controllers/adminController");
const userController = require("./controllers/userController");
const formidable = require("formidable");

router.get("/", articleController.showHome);

router.get("/create", articleController.createArticleForm);

router.post("/create", articleController.postDataArticle);

router.get("/api/blog", articleController.index);

router.get("/articles/:id", articleController.showSingleArticle);

router.post("/comments/:id", commentController.commentPost);

router.get("/admin", adminController.panelAdmin);

router.get("/admin/edit/:id", adminController.editForm);

router.post("/admin/edit/:id", adminController.editFormData);

router.get("/admin/delete/:id", adminController.destroy);

router.get("/create/newAuthor", adminController.newAuthorForm);

router.post("/create/newAuthor", adminController.newAuthorFormData);

router.get("/registro", userController.show);

module.exports = router;
