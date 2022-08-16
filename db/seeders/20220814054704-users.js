'use strict';
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Table
const { USER_TABLE_NAME } = require('./../models/user.model');

// Create User
async function createUser({ email, password, role = 'customer' }) {
  const hashPassword = await bcrypt.hash(password, 10);
  return {
    id: uuidv4(),
    email: email,
    password: hashPassword,
    role: role,
  };
}

module.exports = {
  async up(queryInterface) {
    // Admin user
    const admin = await createUser({
      email: process.env.USER_ADMIN_EMAIL,
      password: process.env.USER_ADMIN_PASSWORD,
      role: 'admin',
    });

    await queryInterface.bulkInsert(USER_TABLE_NAME, [admin]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(USER_TABLE_NAME, null);
  },
};
