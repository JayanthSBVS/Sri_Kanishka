const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

function matrimonyAuthMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No matrimony token provided.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.type !== 'matrimony') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token type.',
      });
    }
    
    // Attach matrimony profile ID
    req.matrimonyId = decoded.sub;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired matrimony token.',
    });
  }
}

module.exports = matrimonyAuthMiddleware;
