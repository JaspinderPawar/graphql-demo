const express = require('express');
const { createServer } = require('http');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
import { applyMiddleware } from "graphql-middleware"
const cors = require('cors');
const { createSequelize } = require('../database/models');
const typeDefs = require('../graphql/schemas');
const { createResolvers } = require('../graphql/resolvers');
const { createContext } = require('../graphql/context');
const permissions = require('../graphql/permisssions');
const app = express();

const createHttpServer = async () => {
  app.use(cors());

  const sequelize = await createSequelize();
  const resolvers = createResolvers({ sequelize })
  const context = createContext({ sequelize })
  const apolloServer = new ApolloServer({
    schema: applyMiddleware(
      makeExecutableSchema({ typeDefs, resolvers }),
      permissions
    ),
    context,
    introspection: true,
    playground: {
      settings: {
        'schema.polling.enable': false,
        'editor.fontSize': 18,
      },
    },
  });

  apolloServer.applyMiddleware({ app, path: '/api' });

  const server = createServer(app);
  return server
}
module.exports = { createHttpServer };
