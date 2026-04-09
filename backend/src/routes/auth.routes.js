/**
 * auth.routes.js
 * Defines URL paths for auth endpoints.
 * No logic here — delegates to controller.
 */

const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

// POST /api/auth/login
router.post('/login', authController.login);
// POST /api/auth/register
router.post('/register', authController.register);

// GET /api/auth/me  (protected)
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
