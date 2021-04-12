const { AuthenticationError } = require('apollo-server-express')
const { skip } = require('graphql-resolvers')

const isAuthenticated = (root, args, { user }) => user ? skip : new AuthenticationError('Not authenticated');

module.exports = { isAuthenticated, };
