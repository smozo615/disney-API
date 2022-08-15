'use strict';

// TABLES NAME
const {
  CHARACTER_MOVIE_TABLE_NAME,
} = require('../models/characterMovie.model');
const { CHARACTER_TABLE_NAME } = require('../models/character.model');
const { MOVIE_TABLE_NAME } = require('../models/movie.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CHARACTER_MOVIE_TABLE_NAME, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        unique: true,
      },
      characterId: {
        field: 'character_id',
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        references: {
          model: CHARACTER_TABLE_NAME,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      movieId: {
        field: 'movie_id',
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        references: {
          model: MOVIE_TABLE_NAME,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CHARACTER_MOVIE_TABLE_NAME);
  },
};
