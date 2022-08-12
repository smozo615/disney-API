/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        image:
 *          type: string
 *        name:
 *          type: string
 *      required:
 *        - image
 *        - name
 */
const express = require('express');

// middleware: validator and schemas
const { dataValidator } = require('../middlewares/validator.middleware');
const {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} = require('../schemas/category.schema');

// Router
const router = express.Router();

// Service
const { CategoriesService } = require('../services/category.service');
const service = new CategoriesService();

// Create category
/**
 * @swagger
 * /api/v1/categories:
 *  post:
 *    summary: Create new category
 *    description: Return category created
 *    tags: [Category]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      '201':
 *        description: New category created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      '400':
 *        description: There is something wrong with the req body
 */
router.post(
  '/',
  dataValidator(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newCategory = await service.createCategory(body);
      res.status(201).json(newCategory);
    } catch (err) {
      next(err);
    }
  }
);

// Get all category
/**
 * @swagger
 * /api/v1/categories:
 *  get:
 *    summary: Returns all category
 *    description: Return an Array with all category in db
 *    tags: [Category]
 *    responses:
 *      '200':
 *        description: Everything works perfect
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Category'
 */
router.get('/', async (req, res, next) => {
  try {
    const categories = await service.getAllCategories();
    res.send(categories);
  } catch (err) {
    next(err);
  }
});

// Get category by ID
/**
 * @swagger
 * /api/v1/categories/{id}:
 *  get:
 *    summary: Find category by ID
 *    description: Returns category based on ID
 *    tags: [Category]
 *    responses:
 *      '200':
 *        description: Return category
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      '400':
 *        description: Something in the req is wrong
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of Category to find
 *        required: true
 *        schema:
 *          type: string
 *
 */
router.get(
  '/:id',
  dataValidator(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findCategoryById(id);
      res.json(category);
    } catch (err) {
      next(err);
    }
  }
);

// Update category
/**
 * @swagger
 * /api/v1/categories/{id}:
 *  patch:
 *    tags: [Category]
 *    summary: Update category
 *    description: return category with changes made
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of category to update
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: successfully updated category
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      '400':
 *        description: bad request
 */
router.patch(
  '/:id',
  dataValidator(getCategorySchema, 'params'),
  dataValidator(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const category = await service.updateCategory(id, body);
      res.json(category);
    } catch (err) {
      next(err);
    }
  }
);

// Delete category
/**
 * @swagger
 * /api/v1/categories/{id}:
 *  delete:
 *    tags: [Category]
 *    summary: Delete category
 *    description: return category deleted
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of category to delete
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: successfully deleted category
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      '400':
 *        description: bad request
 */
router.delete(
  '/:id',
  dataValidator(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.deleteCategory(id);
      res.json(category);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
