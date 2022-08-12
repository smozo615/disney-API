const Joi = require('joi');

// Attributes
const id = Joi.string().guid({
  version: ['uuidv4', 'uuidv5'],
});
const name = Joi.string();
const image = Joi.string();

// Schemas
const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required(),
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
  image: image,
});

module.exports = {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
};
