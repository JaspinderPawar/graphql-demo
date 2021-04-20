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
    let mutate;

    before(async () => {
        /* eslint-disable  prefer-destructuring */
        sequelize = await createSequelize();
        resolvers = createResolvers({ sequelize });
        const apolloServer = new ApolloServer({ typeDefs, resolvers });
        const client = createTestClient({
            apolloServer,
        });
        mutate = client.mutate;

        /* eslint-enable  prefer-destructuring */
    });

    beforeEach(() => sequelize.truncate());

    it('Throw if un-authenticated user', async () => {

        const { loginMutate } = mutationHelper;

        const { errors: [res] } = await mutate(loginMutate, {
            variables: { email: 'nancy@foo.co1', password: 'password3' },
        });
        const { extensions: { code } } = res
        assert.strictEqual(code, 'UNAUTHENTICATED');
    });

    it('Register and login', async () => {
        const { registerMutate, loginMutate } = mutationHelper;

        const user = { email: 'nancy@foo.co', name: 'john', password: 'password' };
        const { data: { register } } = await mutate(registerMutate, {
            variables: user,
        });


        assert.deepStrictEqual({ name: register.name, email: register.email }, { name: user.name, email: user.email });

        const { data: { login } } = await mutate(loginMutate, {
            variables: user,
        });
        assert.notStrictEqual(login.token, null);
        assert.notStrictEqual(login.token, '')

        const { errors: [res] } = await mutate(loginMutate, {
            variables: { email: 'nancy@foo.co1', password: 'password3' },
        });
        const { extensions: { code } } = res
        assert.strictEqual(code, 'UNAUTHENTICATED')

    });
});