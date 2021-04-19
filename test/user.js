const { describe, it } = require('mocha');
const assert = require('assert');
import { createTestClient } from 'apollo-server-integration-testing';

const typeDefs = require('../graphql/schemas');
const { createSequelize } = require('../database/models');
const { createResolvers } = require('../graphql/resolvers');
const { ApolloServer } = require('apollo-server-express');
const mutationHelper = require('./mutate')


describe('Users#user', () => {

    let sequelize;
    let resolvers;

    before(async () => {
        /* eslint-disable  prefer-destructuring */
        sequelize = await createSequelize();
        resolvers = createResolvers({ sequelize })

        /* eslint-enable  prefer-destructuring */
    });

    beforeEach(() => sequelize.truncate());

    it('Register and login', async () => {
        const apolloServer = new ApolloServer({ typeDefs, resolvers });
        const { mutate } = createTestClient({
            apolloServer,
        });

        const { registerMutate, loginMutate } = mutationHelper;

        const user = { email: 'nancy@foo.co', name: 'john', password: 'password' };;
        const { data: { register } } = await mutate(registerMutate, {
            variables: user,
        });

        assert.deepStrictEqual(register, { name: user.name, email: user.email });

        const { data: { login } } = await mutate(loginMutate, {
            variables: user,
        });
        assert.notStrictEqual(login.token, null);
        assert.notStrictEqual(login.token, '')

    });
});