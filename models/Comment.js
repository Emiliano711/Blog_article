module.exports = function (sequelize, Model, DataTypes) {
    class Comment extends Model {}
    Comment.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        
      },
      {
        sequelize,
        modelName: "Comment",
      }
    );
    return Comment;
  };
  