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

// Router
const router = express.Router();

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
 */
router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = body;
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

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
    const users = { email: 'admin@disney.com', password: 'admin' };
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
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID od user to find
 *        required: true
 *        schema:
 *          type: string
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = { id };
    res.json(user);
  } catch (err) {
    next(err);
  }
});

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
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to find
 *        required: true
 *        schema:
 *          type: string
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = { id: id, body: body };
    res.json(user);
  } catch (err) {
    next(err);
  }
});

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
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID od user to find
 *        required: true
 *        schema:
 *          type: string
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = { id };
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
