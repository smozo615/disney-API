const express = require('express');
const usersRouter = require('./users.router');
const charactersRouter = require('./characters.router');
const moviesRouter = require('./movies.router');
const categoriesRouter = require('./categories.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/characters', charactersRouter);
  router.use('/movies', moviesRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = { routerApi };
