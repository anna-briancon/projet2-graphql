const { Op } = require('sequelize');
const Post = require("../models/Post.js");
const Comment = require('../models/Comment.js');

const resolvers = {
  Query: {
    posts: async (_, { sortBy }) => {
      const order = sortBy === 'old' ? [['createdAt', 'ASC']] : [['createdAt', 'DESC']];
      return await Post.findAll({ order });
    },
    post: async (_, { id }) => await Post.findByPk(id),
    comments: async (_, { postId }) => await Comment.findAll({ where: { postId } }),
  },
  Mutation: {
    addPost: async (_, { title, link, author }) => {
      return await Post.create({ title, link, author });
    },
    addComment: async (_, { postId, author, content }) => {
      return await Comment.create({ postId, author, content });
    },
    deletePost: async (_, { id }) => {
      const post = await Post.findByPk(id);
      if (post) {
        await Comment.destroy({ where: { postId: id } });
        await post.destroy();
        return true;
      }
      return false;
    },
  },
};

module.exports = { resolvers };