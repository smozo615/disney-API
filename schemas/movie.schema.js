const Joi = require('joi');

// Attributes
const id = Joi.string().guid({
  version: ['uuidv4', 'uuidv5'],
});
const title = Joi.string();
const image = Joi.string();
const releaseDate = Joi.date();
const stars = Joi.number().min(1).max(5);

// Schemas
const createMovieSchema = Joi.object({
  title: title.required(),
  image: image.required(),
  releaseDate: releaseDate.required(),
  stars: stars.required(),
});

const getMovieSchema = Joi.object({
  id: id.required(),
});

const updateMovieSchema = Joi.object({
  title: title,
  image: image,
  releaseDate: releaseDate,
  stars: stars,
});

module.exports = { createMovieSchema, getMovieSchema, updateMovieSchema };
