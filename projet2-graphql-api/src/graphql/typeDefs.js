const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    posts(sortBy: String): [Post!]!
    post(id: ID!): Post
    comments(postId: ID!): [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    link: String!
    author: String!
    createdAt: String!
  }

  type Comment {
    id: ID!
    postId: ID!
    author: String!
    content: String!
    createdAt: String!
  }

  type Mutation {
    addPost(title: String!, link: String!, author: String!): Post!
    addComment(postId: ID!, author: String!, content: String!): Comment!
    deletePost(id: ID!): Boolean!
  }
`;

module.exports = { typeDefs };
