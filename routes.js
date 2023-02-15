const express = require("express");
const router = express.Router();
const articleController = require("./controllers/articleController");
const commentController = require("./controllers/commentController");
const adminController = require("./controllers/adminController");
const userController = require("./controllers/userController");
const formidable = require("formidable");
const isAuthenticated = require("./middlewares/isAuthenticated");

router.get("/", articleController.showHome);

router.get("/create", articleController.createArticleForm);

router.post("/create", articleController.postDataArticle);

router.get("/api/blog", articleController.index);

router.get("/articles/:id", articleController.showSingleArticle);

router.post("/comments/:id", commentController.commentPost);

router.get("/admin", isAuthenticated, adminController.panelAdmin);

router.get("/admin/edit/:id", adminController.editForm);

router.post("/admin/edit/:id", adminController.editFormData);

router.get("/admin/delete/:id", adminController.destroy);

router.get("/create/newUser", adminController.newUserForm);

router.post("/create/newUser", adminController.newUserFormData);

router.get("/registro", userController.show);

router.post("/registro", userController.login);

module.exports = router;
