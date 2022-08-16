/**
 * @swagger
 * components:
 *  schemas:
 *    Movie:
 *      type: object
 *      properties:
 *        image:
 *          type: string
 *        title:
 *          type: string
 *        releaseDate:
 *          type: string
 *        stars:
 *          type: integer
 *          minimun: 1
 *          maximun: 5
 *        category:
 *          $ref: '#components/schemas/Category'
 *      required:
 *        - image
 *        - title
 *        - stars
 *        - releaseDate
 */
const express = require('express');
const passport = require('passport');

// middleware: validator and schemas
const { dataValidator } = require('../middlewares/validator.middleware');
const {
  createMovieSchema,
  getMovieSchema,
  updateMovieSchema,
  addCharacterSchema,
  queryMovieSchema,
} = require('../schemas/movie.schema');

// Middleware: check role
const { checkRole } = require('../middlewares/auth.middleware');

// Router
const router = express.Router();

// Service
const { MoviesService } = require('../services/movie.service');
const service = new MoviesService();

// Create movie
/**
 * @swagger
 * /api/v1/movies:
 *  post:
 *    summary: Create new movie
 *    description: Return movie created
 *    tags: [Movie]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movie'
 *    responses:
 *      '201':
 *        description: New movie created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      '400':
 *        description: There is something wrong with the req body
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 *    security:
 *      - bearerAuth: []
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  dataValidator(createMovieSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newMovie = await service.createMovie(body);
      res.status(201).json(newMovie);
    } catch (err) {
      next(err);
    }
  }
);

// Get all movie
/**
 * @swagger
 * /api/v1/movies:
 *  get:
 *    summary: Returns all movie
 *    description: Return an Array with all movie in db
 *    tags: [Movie]
 *    responses:
 *      '200':
 *        description: Everything works perfect
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Movie'
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 *    security:
 *      - bearerAuth: []
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin', 'customer'),
  dataValidator(queryMovieSchema, 'query'),
  async (req, res, next) => {
    try {
      const movies = await service.getAllMovies(req.query);
      res.send(movies);
    } catch (err) {
      next(err);
    }
  }
);

// Get movie by ID
/**
 * @swagger
 * /api/v1/movies/{id}:
 *  get:
 *    summary: Find movie by ID
 *    description: Returns movie based on ID
 *    tags: [Movie]
 *    responses:
 *      '200':
 *        description: Return movie
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      '400':
 *        description: Something in the req is wrong
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of movie to find
 *        required: true
 *        schema:
 *          type: string
 *
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin', 'customer'),
  dataValidator(getMovieSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = await service.findMovieById(id);
      res.json(movie);
    } catch (err) {
      next(err);
    }
  }
);

// Update movie
/**
 * @swagger
 * /api/v1/movies/{id}:
 *  patch:
 *    tags: [Movie]
 *    summary: Update movie
 *    description: return movie with changes made
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movie'
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of movie to update
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: successfully updated movie
 *        content:
 *          application/json:
 *            type: object
 *              example: {state: updated}
 *      '400':
 *        description: bad request
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 *    security:
 *      - bearerAuth: []
 */
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  dataValidator(getMovieSchema, 'params'),
  dataValidator(updateMovieSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const movie = await service.updateMovie(id, body);
      res.json(movie);
    } catch (err) {
      next(err);
    }
  }
);

// delete movie
/**
 * @swagger
 * /api/v1/movies/{id}:
 *  delete:
 *    tags: [Movie]
 *    summary: delete movie
 *    description: return movie deleted
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of movie to delete
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: successfully deleted movie
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {state: deleted}
 *      '400':
 *        description: bad request
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 *    security:
 *      - bearerAuth: []
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  dataValidator(getMovieSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = await service.deleteMovie(id);
      res.json(movie);
    } catch (err) {
      next(err);
    }
  }
);

// Add Character to Movie
/**
 * @swagger
 * /api/v1/movies/add-character:
 *  post:
 *    tags: [Movie]
 *    summary: Add character to movie
 *    description: return message = relation:ok
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              categoryId:
 *                type: string
 *              movieId:
 *                type: string
 *    responses:
 *      '200':
 *        description: successfully added character to movie
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            example: {relation: ok}
 *
 *      '400':
 *        description: bad request
 *      '401':
 *        $ref: '#/components/responses/UnauthorizedError'
 *    security:
 *      - bearerAuth: []
 */
router.post(
  '/add-character',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  dataValidator(addCharacterSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const relation = await service.addCharacter(body);
      res.json(relation);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
