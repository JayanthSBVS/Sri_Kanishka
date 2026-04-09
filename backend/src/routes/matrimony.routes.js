/**
 * matrimony.routes.js
 * Defines URL paths for matrimony endpoints.
 * Route order matters: /profiles must come before /:id/pay
 */

const express = require('express');
const router = express.Router();
const matrimonyController = require('../controllers/matrimony.controller');
const matrimonyAuthMiddleware = require('../middlewares/matrimonyAuth.middleware');
const upload = require('../config/multer');

// GET /api/matrimony/profiles  — public, no auth needed
router.get('/profiles', matrimonyController.getActiveProfiles);

// GET /api/matrimony/me  — protected by Matrimony Auth
router.get('/me', matrimonyAuthMiddleware, matrimonyController.getMyProfile);

// PUT /api/matrimony/me  — protected
router.put('/me', matrimonyAuthMiddleware, matrimonyController.updateMyProfile);

// POST /api/matrimony/register  — PUBLIC
router.post('/register', upload.single('profilePhoto'), matrimonyController.registerProfile);

// POST /api/matrimony/login  — PUBLIC
router.post('/login', matrimonyController.loginProfile);

// POST /api/matrimony/:id/pay  — protected by Matrimony Auth
router.post('/:id/pay', matrimonyAuthMiddleware, matrimonyController.payForProfile);

module.exports = router;
