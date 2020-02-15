const { ApolloServer, gql } = require('apollo-server-koa');

const typeDefs = gql`
  type Query  {
    posts: [ PostSummary],
    postById (id: ID!): Post,
    authorsByComments: [ AuthCommSummary ]
  }

  type Mutation {
    addPost (postTitle: String!, postText: String!,  author: String!) : PostSummary
  }

  type Post {
    postTitle: String
    postText: String
    author: String
  }

  type PostSummary {
    postTitle: String
  }

  type AuthCommSummary {
    author: String
    comments: Int
  }
  `;

module.exports =  typeDefs ;
