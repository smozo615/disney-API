'use strict';

// Tables Name
const { USER_TABLE_NAME } = require('./../models/user.model');
const { CATEGORY_TABLE_NAME } = require('../models/category.model');
const { CHARACTER_TABLE_NAME } = require('../models/character.model');
const { MOVIE_TABLE_NAME } = require('../models/movie.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE_NAME, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        unique: true,
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
    });
    await queryInterface.createTable(CATEGORY_TABLE_NAME, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        unique: true,
      },
      image: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
    });
    await queryInterface.createTable(CHARACTER_TABLE_NAME, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        unique: true,
      },
      image: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      age: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      weight: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      story: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
    });
    await queryInterface.createTable(MOVIE_TABLE_NAME, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        unique: true,
      },
      image: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      title: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      releaseDate: {
        type: Sequelize.DataTypes.DATE,
        field: 'release_date',
        allowNull: false,
      },
      stars: {
        allowNull: false,
        type: Sequelize.DataTypes.FLOAT,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USER_TABLE_NAME);
    await queryInterface.dropTable(CHARACTER_TABLE_NAME);
    await queryInterface.dropTable(CATEGORY_TABLE_NAME);
    await queryInterface.dropTable(MOVIE_TABLE_NAME);
  },
};
