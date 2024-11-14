const { DataTypes } = require("@sequelize/core");
const sequelize = require("../utils/sequelize");
const Post = require("./Post");

const Comment = sequelize.define('Comment', {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Comment.belongsTo(Post, { foreignKey: 'postId' });

module.exports = Comment;