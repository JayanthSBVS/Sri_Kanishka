/**
 * matrimony.controller.js
 * Handles HTTP req/res for matrimony routes.
 * All business logic lives in matrimony.service.js.
 */

const matrimonyService = require('../services/matrimony.service');

/**
 * POST /api/matrimony/register
 * Public — no global auth required.
 * Registers a new Matrimony profile.
 */
async function registerProfile(req, res, next) {
  try {
    const formData = req.body;
    
    const result = await matrimonyService.registerProfile(formData, req.file);

    res.status(201).json({
      success: true,
      message: 'Matrimony Profile registered successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/matrimony/login
 * Public — Login into Matrimony system
 */
async function loginProfile(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required.' });
    }
    
    const result = await matrimonyService.loginProfile(email, password);
    res.status(200).json({
      success: true,
      message: 'Logged into Matrimony successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/matrimony/:id/pay
 * Requires: Bearer token (auth middleware)
 * Body: { simulateSuccess: true|false }
 *
 * In production, replace simulateSuccess with an actual payment gateway
 * callback (webhook) or order verification.
 */
async function payForProfile(req, res, next) {
  try {
    const { id } = req.params;
    // Default to success if not provided (makes testing easier)
    const simulateSuccess = req.body.simulateSuccess !== false;

    const result = await matrimonyService.payForProfile(id, simulateSuccess);

    const httpStatus = result.payment.success ? 200 : 402;
    res.status(httpStatus).json({
      success: result.payment.success,
      message: result.payment.message,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/matrimony/profiles
 * Public — no auth required.
 * Returns only active (paid) profiles.
 */
async function getActiveProfiles(req, res, next) {
  try {
    const profiles = await matrimonyService.getActiveProfiles();

    res.status(200).json({
      success: true,
      data: { profiles, count: profiles.length },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/matrimony/me
 * Protected — requires auth.
 * Returns the logged-in user's matrimony profile if it exists.
 */
async function getMyProfile(req, res, next) {
  try {
    const matrimonyId = req.matrimonyId;
    const profile = await matrimonyService.getMyProfile(matrimonyId);

    res.status(200).json({
      success: true,
      data: { profile },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/matrimony/me
 * Protected — requires auth.
 * Updates the logged-in user's matrimony profile data.
 */
async function updateMyProfile(req, res, next) {
  try {
    const matrimonyId = req.matrimonyId;
    const formFields = req.body;
    
    // We expect the flexible formFields object
    const updatedProfile = await matrimonyService.updateMyProfile(matrimonyId, formFields);

    res.status(200).json({
      success: true,
      data: { profile: updatedProfile },
      message: 'Profile updated successfully'
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { registerProfile, loginProfile, payForProfile, getActiveProfiles, getMyProfile, updateMyProfile };
