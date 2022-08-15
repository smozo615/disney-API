const Joi = require('joi');

// Attributes
const id = Joi.string().guid({
  version: ['uuidv4', 'uuidv5'],
});
const name = Joi.string();
const image = Joi.string();
const age = Joi.number().integer();
const weight = Joi.number().min(20).max(120);
const story = Joi.string().min(10);

// Query Params
const movieId = Joi.string().guid({
  version: ['uuidv4', 'uuidv5'],
});

// Schemas
const createCharacterSchema = Joi.object({
  name: name.required(),
  image: image.required(),
  age: age.required(),
  weight: weight.required(),
  story: story.required(),
});

const getCharacterSchema = Joi.object({
  id: id.required(),
});

const updateCharacterSchema = Joi.object({
  name: name,
  image: image,
  age: age,
  weight: weight,
  story: story,
});

const queryCharacterSchema = Joi.object({
  name: name,
  age: age,
  movieId: movieId,
});

module.exports = {
  createCharacterSchema,
  getCharacterSchema,
  updateCharacterSchema,
  queryCharacterSchema,
};
