const Joi = require('joi');

const id = Joi.string().guid({
  version: ['uuidv4', 'uuidv5'],
});
const email = Joi.string().email();
const password = Joi.string().min(8);

// Schemas
const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
