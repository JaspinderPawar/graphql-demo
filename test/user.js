
const { describe, it } = require('mocha');
const assert = require('assert');
import { createTestClient } from 'apollo-server-integration-testing';

const typeDefs = require('../graphql/schemas');
const resolvers = require('../graphql/resolvers');
;
const { ApolloServer } = require('apollo-server-express');


describe('Users#user', () => {

    it('Register and login', async () => {
        const apolloServer = new ApolloServer({ typeDefs, resolvers });
        const { query, mutate } = createTestClient({
            apolloServer,
        });

        const registerUser = `
            mutation register ($email: String!, $name: String!, $password: String!){
                register(input: { email: $email, password: $password, name: $name }) {
                  name
                  email
                }
              }
            `;

        const user = { email: 'nancy@foo.co', name: 'john', password: 'password' };;
        const { data: { register } } = await mutate(registerUser, {
            variables: user,
        });

        assert.deepStrictEqual(register, { name: user.name, email: user.email });

        const loginMutate = `
        mutation login ($email: String!, $password: String! ){
            login(input: { email: $email, password: $password  }) {
                token
            }
          }
        `;
        const { data: { login } } = await mutate(loginMutate, {
            variables: user,
        });
        assert.notStrictEqual(login.token, null);
        assert.notStrictEqual(login.token, '')

    });
});