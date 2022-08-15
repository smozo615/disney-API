const Joi = require('joi');

// Attributes
const title = Joi.string();
const image = Joi.string();
const releaseDate = Joi.date();
const stars = Joi.number().min(1).max(5);
const category = Joi.object({
  image: image.required(),
  name: Joi.string().required(),
});
const id = Joi.string().guid({
  version: ['uuidv4', 'uuidv5'],
});
const categoryId = Joi.string().guid({
  version: ['uuidv4', 'uuidv5'],
});
const characterId = Joi.string().guid({
  version: ['uuidv4', 'uuidv5'],
});
const movieId = Joi.string().guid({
  version: ['uuidv4', 'uuidv5'],
});

// Query params
const order = Joi.any().allow('ASC', 'DESC').only();

// Schemas
const createMovieSchema = Joi.object({
  title: title.required(),
  image: image.required(),
  releaseDate: releaseDate.required(),
  stars: stars.required(),
  categoryId: categoryId,
  category: category,
});

const getMovieSchema = Joi.object({
  id: id.required(),
});

const updateMovieSchema = Joi.object({
  title: title,
  image: image,
  releaseDate: releaseDate,
  stars: stars,
  categoryId: categoryId,
});

const addCharacterSchema = Joi.object({
  characterId: characterId.required(),
  movieId: movieId.required(),
});

const queryMovieSchema = Joi.object({
  title: title,
  categoryId: categoryId,
  order: order,
});

module.exports = {
  createMovieSchema,
  getMovieSchema,
  updateMovieSchema,
  addCharacterSchema,
  queryMovieSchema,
};
