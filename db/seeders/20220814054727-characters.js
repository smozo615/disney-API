'use strict';
const { v4: uuidv4 } = require('uuid');

// Table
const { CHARACTER_TABLE_NAME } = require('../models/character.model');

module.exports = {
  async up(queryInterface) {
    const characters = [
      {
        id: uuidv4(),
        image: 'www.characterImage.com',
        name: 'Character 1',
        age: 20,
        weight: 70,
        story: 'A long story',
      },
      {
        id: uuidv4(),
        image: 'www.characterImage.com',
        name: 'Character 2',
        age: 45,
        weight: 90,
        story: 'A long story 2',
      },
    ];
    await queryInterface.bulkInsert(CHARACTER_TABLE_NAME, characters);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CHARACTER_TABLE_NAME, null);
  },
};
