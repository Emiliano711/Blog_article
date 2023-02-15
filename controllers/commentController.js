const { sequelize, User, Article, Comment } = require("../models/index");

const commentPost = async (req, res) => {
  await Comment.create({
    content: req.body.content,
    userId: req.body.user,
    ArticleId: req.params.id,
  });
  res.redirect(`/articles/${req.params.id}`);
};

module.exports = { commentPost };
