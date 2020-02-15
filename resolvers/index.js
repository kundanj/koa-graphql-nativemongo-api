const { ApolloServer } = require('apollo-server-koa');
const { getPostList, getPostById, addPostDetails, getAuthorsbyComments } = require('../db');

const resolvers = {
  Query: {
    posts:  getPostList,
    postById:  getPostById,
    authorsByComments:  getAuthorsbyComments,
  },
  Mutation: {
    addPost: addPostDetails,
  }
}

module.exports = resolvers;
