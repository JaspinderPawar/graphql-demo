const { describe, it } = require('mocha');
const assert = require('assert');
import { createTestClient } from 'apollo-server-integration-testing';

const typeDefs = require('../graphql/schemas');
const { createSequelize } = require('../database/models');
const { createResolvers } = require('../graphql/resolvers');
const { ApolloServer } = require('apollo-server-express');
const mutationHelper = require('./mutate')


describe.only('Post', () => {

    let sequelize;
    let resolvers;
    let mutate;
    let userId = 0

    before(async () => {
        /* eslint-disable  prefer-destructuring */
        sequelize = await createSequelize();
        resolvers = createResolvers({ sequelize });
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            context: () => {
                return { user: { id: userId } }
            }
        });
        const client = createTestClient({
            apolloServer,
        });
        mutate = client.mutate;

        /* eslint-enable  prefer-destructuring */
    });

    beforeEach(() => sequelize.truncate());


    it('Create new post', async () => {
        const { registerMutate } = mutationHelper;

        const user = { email: 'nancy@foo.co', name: 'john', password: 'password' };
        const { data: { register: { id } } } = await mutate(registerMutate, {
            variables: user,
        });

        userId = id;

        const postMutate = `
        mutation createPost ($title: String!, $content: String! ){
            createPost(title: $title, content: $content) {
                id
                title
                content
                createdAt
              }
          }
        `;

        const post = { title: 'Test title', content: 'Test content of the post' }
        const { data: { createPost: { title, content } } } = await mutate(postMutate, {
            variables: post,
        });

        assert.strictEqual(post.title, title);
        assert.strictEqual(post.content, content)

    });
});