
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express')

const createContext = ({ sequelize: { models: { User } } }) => {

  const verifyToken = async (token) => {
    try {
      if (!token) return null;
      const { id } = await jwt.verify(token, 'mySecret');
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw new AuthenticationError(error.message);
    }
  };

  return async ({ req }) => {
    const token = (req.headers && req.headers.authorization) || '';
    const user = await verifyToken(token)
    return { user };
  };

};

module.exports = { createContext }
