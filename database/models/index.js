require('dotenv').config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

const createSequelize = async () => {


  const db = {};

  const {
    url,
    sync,
    logging,
    operatorsAliases,
    ssl,
    dialectOptions,
  } = config;

  const sequelize = new Sequelize(url, {
    dialect: 'postgres',
    logging,
    operatorsAliases,
    ssl,
    dialectOptions,
  });

  fs.readdirSync(__dirname)
    .filter((file) => (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    ))
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  if (sync) {
    await sequelize.sync({ force: true });
  }

  return {
    db,
    models: sequelize.models,
    close: () => sequelize.connectionManager.close(),
    truncate: async () => {
      await db.sequelize.models.User.truncate({ cascade: true });
      await Promise.all(
        Object.values(db.sequelize.models)
          .map(model => model.truncate({ cascade: true })),
      );
    },
  };


}

module.exports = { createSequelize }
