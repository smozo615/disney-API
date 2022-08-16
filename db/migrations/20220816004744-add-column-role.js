'use strict';

// Table name
const { USER_TABLE_NAME } = require('../models/user.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE_NAME, 'role', {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
      defaultValue: 'customer',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(USER_TABLE_NAME, 'role');
  },
};
