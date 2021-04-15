const express = require('express');
const { createServer } = require('http');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
import { applyMiddleware } from "graphql-middleware"
const cors = require('cors');
const typeDefs = require('../graphql/schemas');
const resolvers = require('../graphql/resolvers');
const context = require('../graphql/context');
const permissions = require('../graphql/permisssions');
const app = express();

app.use(cors());

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

module.exports = server;
