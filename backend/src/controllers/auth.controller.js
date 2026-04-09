/**
 * auth.controller.js
 * Handles HTTP req/res for auth routes.
 * Delegates all logic to auth.service.js.
 */

const authService = require('../services/auth.service');

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/auth/me
 * Requires: Bearer token in Authorization header
 */
async function getMe(req, res, next) {
  try {
    // req.user is set by authMiddleware
    const user = await authService.getMe(req.user.id);

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/auth/register
 * Body: { name, email, password }
 */
async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const result = await authService.register(name, email, password);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { login, getMe, register };
