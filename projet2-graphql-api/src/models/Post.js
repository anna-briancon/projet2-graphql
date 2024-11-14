const { DataTypes } = require("@sequelize/core");
const sequelize = require("../utils/sequelize");

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Post;
