'use strict';
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Table
const { USER_TABLE_NAME } = require('./../models/user.model');

module.exports = {
  async up(queryInterface) {
    // Admin User
    const hashPassword = await bcrypt.hash(process.env.USER_ADMIN_PASSWORD, 10);
    const user = {
      id: uuidv4(),
      email: process.env.USER_ADMIN_EMAIL,
      password: hashPassword,
    };

    await queryInterface.bulkInsert(USER_TABLE_NAME, [user]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(USER_TABLE_NAME, null);
  },
};
