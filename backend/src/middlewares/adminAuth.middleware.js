/**
 * adminAuth.middleware.js
 * Verifies JWT AND ensures the user has role === 'admin'.
 */

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

function adminAuthMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden. Admin access required.' })
    }

    req.user = { id: decoded.sub, role: decoded.role }
    next()
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' })
  }
}

module.exports = adminAuthMiddleware
