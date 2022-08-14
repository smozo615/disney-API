'use strict';
const { v4: uuidv4 } = require('uuid');

// Table
const { CATEGORY_TABLE_NAME } = require('../models/category.model');

module.exports = {
  async up(queryInterface) {
    const categories = [
      {
        id: uuidv4(),
        image: 'www.CategoryImage.com',
        name: 'Category Title',
      },
      {
        id: uuidv4(),
        image: 'www.CategoryImage2.com',
        name: 'Category 2',
      },
    ];
    await queryInterface.bulkInsert(CATEGORY_TABLE_NAME, categories);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CATEGORY_TABLE_NAME, null);
  },
};
