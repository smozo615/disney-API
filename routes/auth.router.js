const express = require('express');

// middleware: validator and schemas
const { dataValidator } = require('../middlewares/validator.middleware');
const { createUserSchema } = require('./../schemas/user.schema');

// Router
const router = express.Router();

// Service
const { AuthService } = require('../services/auth.service');
const service = new AuthService();

// Login
/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: log in
 *    description: get token
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '201':
 *        description: obtained token
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {token: string}
 *
 *      '400':
 *        description: There is with login credentials
 */
router.post(
  '/login',
  dataValidator(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const token = await service.login(body);
      res.json(token);
    } catch (err) {
      next(err);
    }
  }
);

// Register
/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *    summary: Register
 *    description: get token
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '201':
 *        description: register
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {message: string}
 *
 *      '400':
 *        description: There is with the data
 */
router.post(
  '/register',
  dataValidator(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newUser = await service.registerUser(body);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
