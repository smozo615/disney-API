'use strict';

const { MOVIE_TABLE_NAME } = require('../models/movie.model');
const { CATEGORY_TABLE_NAME } = require('../models/category.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(MOVIE_TABLE_NAME, 'category_id', {
      field: 'category_id',
      allowNull: false,
      type: Sequelize.DataTypes.UUID,
      references: {
        model: CATEGORY_TABLE_NAME,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(MOVIE_TABLE_NAME, 'category_id');
  },
};
