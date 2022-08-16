const boom = require('@hapi/boom');

// Models
const { models } = require('../db/sequelize');

class MoviesService {
  async createMovie(data) {
    const newMovie = await models.Movie.create(data, {
      include: ['category'],
    });
    return newMovie;
  }

  async getAllMovies({ title, categoryId, order }) {
    // Query Options
    const options = {
      attributes: ['image', 'title', 'releaseDate'],
      where: {},
      order: [],
    };
    if (title) {
      options.where.title = title;
    }
    if (categoryId) {
      options.where.categoryId = categoryId;
    }
    if (order) {
      options.order.push(['releaseDate', order]);
    }
    const movies = await models.Movie.findAll(options);
    return movies;
  }

  async findMovieById(id) {
    const movie = await models.Movie.findByPk(id, {
      attributes: ['image', 'title', 'releaseDate', 'stars'],
      include: [
        {
          association: 'category',
          attributes: ['image', 'name'],
        },
        {
          association: 'characters',
          through: {
            attributes: [],
          },
          attributes: { exclude: ['id'] },
        },
      ],
    });
    if (!movie) {
      throw boom.notFound('movie not found');
    }
    return movie;
  }

  async updateMovie(id, changes) {
    const movie = await models.Movie.findByPk(id);
    if (!movie) {
      throw boom.notFound('movie not found');
    }
    if (changes.stars) {
      changes.stars = parseFloat(changes.stars.toFixed(1));
    }
    await movie.update(changes);
    return { state: 'updated' };
  }

  async deleteMovie(id) {
    const movie = await models.Movie.findByPk(id);
    if (!movie) {
      throw boom.notFound('movie not found');
    }
    await movie.destroy();
    return { state: 'deleted' };
  }

  async addCharacter(data) {
    await models.CharacterMovie.create(data);
    return { relation: 'Ok' };
  }
}

module.exports = { MoviesService };
