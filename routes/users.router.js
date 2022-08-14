/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *          format: password
 *      required:
 *        - email
 *        - password
 */
const express = require('express');

// middleware: validator and schemas
const { dataValidator } = require('../middlewares/validator.middleware');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('./../schemas/user.schema');

// Router
const router = express.Router();

// Service
const { UsersService } = require('../services/user.service');
const service = new UsersService();

// Create user
/**
 * @swagger
 * /api/v1/users:
 *  post:
 *    summary: Create new user
 *    description: Return user created
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '201':
 *        description: New user created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: There is something wrong with the req body
 */
router.post(
  '/',
  dataValidator(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newUser = await service.createUser(body);
      console.log(newUser);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
);

// Get all users
/**
 * @swagger
 * /api/v1/users:
 *  get:
 *    summary: Returns all Users
 *    description: Return an Array with all users in db
 *    tags: [User]
 *    responses:
 *      '200':
 *        description: Everything works perfect
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */
router.get('/', async (req, res, next) => {
  try {
    const users = await service.getAllUser();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

// Get user by ID
/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *    summary: Find a user by ID
 *    description: Returns users based on ID
 *    tags: [User]
 *    responses:
 *      '200':
 *        description: Return user with ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                {id: string}
 *      '400':
 *        description: There is something wrong with the req
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID od user to find
 *        required: true
 *        schema:
 *          type: string
 */
router.get(
  '/:id',
  dataValidator(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findUserById(id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

// Update user
/**
 * @swagger
 * /api/v1/users/{id}:
 *  patch:
 *    summary: Update user
 *    description: Return user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              {email: string, password: string}
 *    responses:
 *      '200':
 *        description: User data
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: There is something wrong with the req
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to find
 *        required: true
 *        schema:
 *          type: string
 */
router.patch(
  '/:id',
  dataValidator(getUserSchema, 'params'),
  dataValidator(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const user = await service.updateUser(id, body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

// Delete user
/**
 * @swagger
 * /api/v1/users/{id}:
 *  delete:
 *    summary: Delete user
 *    description: delete users based on ID
 *    tags: [User]
 *    responses:
 *      '200':
 *        description: User deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                {id: string, body: object}
 *      '400':
 *        description: There is something wrong with the req
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID od user to find
 *        required: true
 *        schema:
 *          type: string
 */
router.delete(
  '/:id',
  dataValidator(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.deleteUser(id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
