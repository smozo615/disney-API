'use strict';
const { v4: uuidv4 } = require('uuid');

// Table
const { MOVIE_TABLE_NAME } = require('../models/movie.model');

module.exports = {
  async up(queryInterface) {
    const movies = [
      {
        id: uuidv4(),
        image: 'www.movieImage.com',
        title: 'Movie Title',
        release_date: new Date('08-20-2020').toISOString(),
        stars: 4,
      },
      {
        id: uuidv4(),
        image: 'www.movieImage2.com',
        title: 'Movie Title 2',
        release_date: new Date('08-21-2020').toISOString(),
        stars: 4.5,
      },
    ];
    await queryInterface.bulkInsert(MOVIE_TABLE_NAME, movies);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(MOVIE_TABLE_NAME, null);
  },
};
