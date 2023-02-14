const { sequelize, Author, Article, Comment } = require("../models/index");

const commentPost = async (req, res) => {
    await Comment.create({
      content: req.body.content,
      AuthorId: req.body.author,
      ArticleId: req.params.id,
     })
    res.redirect(`/articles/${req.params.id}`)
    };

    module.exports = {commentPost}