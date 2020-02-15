require ('dotenv').config()
const Koa = require('koa');
const { ApolloServer } = require('apollo-server-koa');
const { initDB, closeDB } = require('./db');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const port = process.env.PORT || 8080;

const app = new Koa();

const server = new ApolloServer (
    {
      typeDefs,
      resolvers,
  });

app.use(server.getMiddleware());

const koaServer = app.listen(port, () =>
  {
    console.log(`listening....at path ${server.graphqlPath}`);
    initDB();
  });


process.on('SIGTERM', () => {
    closeDB();
    koaServer.close();
  })
