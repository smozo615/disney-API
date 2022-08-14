const { Sequelize } = require('sequelize');

const setupModels = require('../db/models');

const options = {
  dialect: 'postgres',
  logging: process.env.NODE_ENV ? true : false,
};

if (process.env.NODE_ENV === 'production') {
  options.dialectOptions = {
    ssl: { rejectUnauthorized: false },
  };
}

const sequelize = new Sequelize(process.env.DATABASE_URL, options);

setupModels(sequelize);

module.exports = sequelize;
