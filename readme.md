
# GraphQL-Node-Sequlize

## What’s GraphQL
GraphQL is query language that enables you to provide a complete and understandable description of the data in your API. Furthermore it gives clients the power to ask for exactly what they need and nothing more. The project’s website can be found at http://graphql.org/.

Send a GraphQL query to your API and get exactly what you need, nothing more and nothing less. GraphQL queries always return predictable results. Apps using GraphQL are fast and stable because they control the data they get, not the server.
## Schema 
Your GraphQL server uses a schema to describe the shape of your data graph. This schema defines a hierarchy of types with fields that are populated from your back-end data stores. The schema also specifies exactly which queries and mutations are available for clients to execute against your data graph. https://www.apollographql.com/docs/apollo-server/schema/schema/

#### Supported types
Every type definition in a GraphQL schema belongs to one of the following categories:
- Scalar types
- Object types
- The Query type
- The Mutation type
- Input types
- Enum types

We will talk about some basic types here
##### Input Types
Input types are special object types that allow you to pass objects as arguments to queries and mutations 

```
 type Post {
     id: Int!
     title: String!
     content: String!
     author: User!
     comments: [Comment!]
     createdAt: String

 }
 ```
##### The Query type
The Query type defines all of the top-level entry points for queries that clients execute against your data graph. It resembles an object type, but its name is always Query.
```
extend type Query {
    getAllPosts: [Post!]
    getSinglePost(postId: Int!): Post
}
```
##### The Mutation type
The Mutation type is similar in structure and purpose to the Query type. Whereas the Query type defines entry points for read operations, the Mutation type defines entry points for write operations.
```
 extend type Mutation {
     createPost(title: String!, content: String!): CreatePostResponse
 }
  type CreatePostResponse {
    id: Int!
    title: String!
    content: String!
    createdAt: String!
 }
```

### Resolvers
GraphQL Server needs to know how to populate data for every field in your schema so that it can respond to requests for that data. To accomplish this, it uses resolvers.

A resolver is a function that's responsible for populating the data for a single field in your schema. It can populate that data in any way you define, such as by fetching data from a back-end database or a third-party API.

Base syntax
```
  Mutation: {
    async createPost(_, { content, title }, { user = null }) {
      return Post.create({
        userId: user.id,
        content,
        title,
      });
    },
  },

  Query: {
    async getAllPosts(root, args, context) {
      return Post.findAll();
    },
    async getSinglePost(_, { postId }, context) {
      return Post.findByPk(postId);
    },
  },
```
## Regarding the dependencies, we have:
- `apollo-server-express`: provides direct connection between Express and Apollo GraphQL server.
- `graphql`: the implementation per se of GraphQL in JavaScript.
- `bcryptjs`: it’ll be used to hash our passwords.
- `jsonwebtoken`: JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.  The claims in a JWT  are encoded as a JSON object that is used as the payload of a JSON  Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.
- `pg and pg-hstore`: the client for Postgres and the serializer/deserializer of JSON to hstore format (and vice versa).
- `sequelize`: the Node.js ORM for Postgres (among other databases) that we’ll use to facilitate the job of communicating with the database.
- `graphql-shield`: GraphQL Shield helps you create a permission layer for your application. Using an intuitive rule-API, you'll gain the power of the shield engine on every request and reduce the load time of every request with smart caching. This way you can make sure your application will remain quick, and no internal data will be exposed.

## How do I get set up?
1. Install NodeJS `14.x` LTS Dubnium line (preferably via NVM `nvm install --lts=dubnium`),
2. Install project dependencies: `npm install`,
3. Set up database,
4. Run migration for development database: `npm run db:migrate`.
5. 
## Running
### Development
1. Run `npm run dev` (it starts nodemon i.e. changes in file trigger server restart),
2. The api is available at `http://localhost:3000`.



