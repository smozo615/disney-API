const { v4: uuidv4 } = require('uuid');
const boom = require('@hapi/boom');

class MoviesService {
  async createMovie(data) {
    const newData = {
      id: uuidv4(),
      ...data,
    };
    const newMovie = newData;
    return newMovie;
  }

  async getAllMovies() {
    const movies = db;
    return movies;
  }

  async findMovieById(id) {
    const movie = db.find((movie) => movie.id === id);
    if (!movie) {
      throw boom.notFound('movie not found');
    }
    return movie;
  }

  async updateMovie(id, changes) {
    const movie = await this.findMovieById(id);
    const updatedmovie = { ...movie, ...changes };
    return updatedmovie;
  }

  async deleteMovie(id) {
    const movie = await this.findMovieById(id);
    return movie;
  }
}

const db = [
  { id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb5d' },
  { id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' },
  { id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb7d' },
];

module.exports = { MoviesService };
