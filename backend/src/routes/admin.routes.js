/**
 * admin.routes.js
 * Admin-only API endpoints.
 * All routes require valid JWT with role === 'admin'.
 */

const { Router } = require('express')
const router = Router()
const adminAuthMiddleware = require('../middlewares/adminAuth.middleware')
const userRepo = require('../repositories/user.repository')
const matrimonyRepo = require('../repositories/matrimony.repository')

// Apply admin auth to all routes in this file
router.use(adminAuthMiddleware)

/**
 * GET /api/admin/users
 * Returns all users (without passwordHash)
 */
router.get('/users', async (req, res, next) => {
  try {
    const users = await userRepo.findAll()
    const safeUsers = users.map(({ passwordHash, ...u }) => u)
    res.json({ success: true, data: safeUsers })
  } catch (err) {
    next(err)
  }
})

/**
 * GET /api/admin/matrimony-profiles
 * Returns all matrimony profiles (without passwordHash)
 */
router.get('/matrimony-profiles', async (req, res, next) => {
  try {
    const profiles = await matrimonyRepo.findAll()
    const safeProfiles = profiles.map(({ passwordHash, ...p }) => p)
    res.json({ success: true, data: safeProfiles })
  } catch (err) {
    next(err)
  }
})

/**
 * GET /api/admin/stats
 * Returns aggregate counts for the dashboard
 */
router.get('/stats', async (req, res, next) => {
  try {
    const [users, profiles] = await Promise.all([
      userRepo.findAll(),
      matrimonyRepo.findAll()
    ])
    res.json({
      success: true,
      data: {
        totalUsers: users.length,
        adminUsers: users.filter(u => u.role === 'admin').length,
        regularUsers: users.filter(u => u.role === 'user').length,
        totalMatrimonyProfiles: profiles.length,
        activeMatrimonyProfiles: profiles.filter(p => p.status === 'active').length,
        paidMatrimonyProfiles: profiles.filter(p => p.paymentStatus === 'paid').length,
      }
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
