const boom = require('@hapi/boom');

// Models
const { models } = require('../db/sequelize');

class MoviesService {
  async createMovie(data) {
    const newMovie = await models.Movie.create(data);
    return newMovie;
  }

  async getAllMovies() {
    const movies = await models.Movie.findAll();
    return movies;
  }

  async findMovieById(id) {
    const movie = await models.Movie.findByPk(id);
    if (!movie) {
      throw boom.notFound('movie not found');
    }
    return movie;
  }

  async updateMovie(id, changes) {
    const movie = await this.findMovieById(id);
    if (changes.stars) {
      changes.stars = parseFloat(changes.stars.toFixed(1));
    }
    const updatedmovie = movie.update(changes);
    return updatedmovie;
  }

  async deleteMovie(id) {
    const movie = await this.findMovieById(id);
    await movie.destroy();
    return { state: 'deleted' };
  }
}

module.exports = { MoviesService };
