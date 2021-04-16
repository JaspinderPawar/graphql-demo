require('dotenv').config(); // eslint-disable-line no-unused-expressions
const { Op } = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const operatorsAliases = Op; // https://github.com/sequelize/sequelize/issues/8417#issuecomment-355123149

const config = {
  development: {
    url: process.env.DATABASE_URL || DOCKER_DEV_DATABASE_URL,
    sync: false,
    logging: true, // eslint-disable-line no-console,
    ssl: false,
    dialectOptions: {
      ssl: false,
    },
    rollbarAccessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    reportErrorRequest: true,
  },
  test: {
    url: process.env.TEST_DATABASE_URL || DOCKER_TEST_DATABASE_URL,
    sync: process.env.SYNC_DATABASE || false,
    logging: false,
    operatorsAliases,
    ssl: false,
    dialectOptions: {
      ssl: false,
    },
  },
  production: {
    url: process.env.DATABASE_URL,
    sync: false,
    logging: false,
    operatorsAliases,
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
    rollbarAccessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    reportErrorRequest: true,
  },
};

module.exports = config;
module.exports.config = config[env];