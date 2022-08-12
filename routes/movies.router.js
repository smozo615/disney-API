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
 *      required:
 *        - image
 *        - title
 *        - stars
 *        - releaseDate
 */
const express = require('express');

// middleware: validator and schemas
const { dataValidator } = require('../middlewares/validator.middleware');
const { createMovieSchema, getMovieSchema, updateMovieSchema } = require('../schemas/movie.schema');
// Router
const router = express.Router();

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
 */
router.post(
  '/',
  dataValidator(createMovieSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newMovie = body;
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
 */
router.get('/', async (req, res, next) => {
  try {
    const movies = [
      {
        image: 'www.imageUrl.com',
        title: 'Aladin y el genio',
        releaseDate: '16',
        stars: 70,
      },
      {
        image: 'www.imageUrl.com',
        title: 'Aladin y el genio',
        releaseDate: '16',
        stars: 70,
      },
    ];
    res.send(movies);
  } catch (err) {
    next(err);
  }
});

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
  dataValidator(getMovieSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = { id };
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
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      '400':
 *        description: bad request
 */
router.patch(
  '/:id',
  dataValidator(getMovieSchema, 'params'),
  dataValidator(updateMovieSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const movie = { id: id, body: body };
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
 *              $ref: '#/components/schemas/Movie'
 *      '400':
 *        description: bad request
 */
router.delete(
  '/:id',
  // dataValidator(getCharacterSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = { id };
      res.json(movie);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
