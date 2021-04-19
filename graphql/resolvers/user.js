const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server-express');

const createUserResolvers = ({ sequelize: { models: { User } } }) => {
  return {
    Mutation: {
      async register(root, args, context) {
        const { name, email, password } = args.input;
        return User.create({ name, email, password });
      },

      async login(root, { input }, context) {
        const { email, password } = input;
        const user = await User.findOne({ where: { email } });
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({ id: user.id }, 'mySecret');
          return { ...user.toJSON(), token };
        }
        throw new AuthenticationError('Invalid credentials');
      },
    },
  };
}
module.exports = { createUserResolvers }
