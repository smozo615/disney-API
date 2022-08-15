const express = require('express');

// Router
const router = express.Router();

// Service
const { AuthService } = require('../services/auth.service');
const service = new AuthService();

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { body } = req;
    const token = await service.login(body);
    res.json(token);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
