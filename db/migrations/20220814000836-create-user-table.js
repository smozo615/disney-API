'use strict';

const { USER_TABLE_NAME } = require('./../models/user.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE_NAME, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
