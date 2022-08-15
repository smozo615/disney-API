/**
 * @swagger
 * components:
 *  schemas:
 *    Character:
 *      type: object
 *      properties:
 *        image:
 *          type: string
 *        name:
 *          type: string
 *        age:
 *          type: integer
 *        weight:
 *          type: integer
 *        story:
 *          type: string
 *      required:
 *        - image
 *        - name
 *        - story
 */
const express = require('express');

// middleware: validator and schemas
const { dataValidator } = require('../middlewares/validator.middleware');
const {
  createCharacterSchema,
  getCharacterSchema,
  updateCharacterSchema,
  queryCharacterSchema,
} = require('../schemas/character.schema');

// Router
const router = express.Router();

// Service
const { CharactersService } = require('../services/character.service');
const service = new CharactersService();

// Create character
/**
 * @swagger
 * /api/v1/characters:
 *  post:
 *    summary: Create new character
 *    description: Return character created
 *    tags: [Character]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Character'
 *    responses:
 *      '201':
 *        description: New user created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Character'
 *      '400':
 *        description: There is something wrong with the req body
 */
router.post(
  '/',
  dataValidator(createCharacterSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newCharacter = await service.createCharacter(body);
      res.status(201).json(newCharacter);
    } catch (err) {
      next(err);
    }
  }
);

// Get all characters
/**
 * @swagger
 * /api/v1/characters:
 *  get:
 *    summary: Returns all characters
 *    description: Return an Array with all characters in db
 *    tags: [Character]
 *    responses:
 *      '200':
 *        description: Everything works perfect
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Character'
 */
router.get(
  '/',
  dataValidator(queryCharacterSchema, 'query'),
  async (req, res, next) => {
    try {
      const characters = await service.getAllCharacters(req.query);
      res.send(characters);
    } catch (err) {
      next(err);
    }
  }
);

// Get character by ID
/**
 * @swagger
 * /api/v1/characters/{id}:
 *  get:
 *    summary: Find character by ID
 *    description: Returns character based on ID
 *    tags: [Character]
 *    responses:
 *      '200':
 *        description: Return character
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Character'
 *      '400':
 *        description: Something in the req is wrong
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of character to find
 *        required: true
 *        schema:
 *          type: string
 *
 */
router.get(
  '/:id',
  dataValidator(getCharacterSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const character = await service.findCharacterById(id);
      res.json(character);
    } catch (err) {
      next(err);
    }
  }
);

// Update character
/**
 * @swagger
 * /api/v1/characters/{id}:
 *  patch:
 *    tags: [Character]
 *    summary: Update character
 *    description: return character with changes made
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Character'
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of character to update
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: successfully updated character
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Character'
 *      '400':
 *        description: bad request
 */
router.patch(
  '/:id',
  dataValidator(getCharacterSchema, 'params'),
  dataValidator(updateCharacterSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const character = await service.updateCharacter(id, body);
      res.json(character);
    } catch (err) {
      next(err);
    }
  }
);

// delete character
/**
 * @swagger
 * /api/v1/characters/{id}:
 *  delete:
 *    tags: [Character]
 *    summary: delete character
 *    description: return character deleted
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of character to delete
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: successfully deleted character
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Character'
 *      '400':
 *        description: bad request
 */
router.delete(
  '/:id',
  dataValidator(getCharacterSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const character = await service.deleteCharacter(id);
      res.json(character);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
