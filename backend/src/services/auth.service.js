/**
 * auth.service.js
 * Business logic for authentication.
 * Controllers call this — no req/res here.
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/user.repository');
const { generateId } = require('../utils/id.util');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Validate credentials and return a signed JWT + safe user object.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token: string, user: Object }>}
 * @throws {Error} with a .statusCode property for the controller to use
 */
async function login(email, password) {
  // 1. Validate inputs
  if (!email || !password) {
    const err = new Error('Email and password are required');
    err.statusCode = 400;
    throw err;
  }

  // 2. Find user
  const user = await userRepo.findByEmail(email);
  if (!user) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  // 3. Compare password
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  // 4. Sign JWT
  const payload = { sub: user.id, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  // 5. Return token + safe (no hash) user data
  const { passwordHash, ...safeUser } = user;
  return { token, user: safeUser };
}

/**
 * Look up a user by their decoded JWT subject (id).
 * @param {string} userId
 * @returns {Promise<Object>}
 */
async function getMe(userId) {
  const user = await userRepo.findById(userId);
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

async function register(name, email, password) {
  if (!name || !email || !password) {
    const err = new Error('Name, email, and password are required');
    err.statusCode = 400;
    throw err;
  }

  const existing = await userRepo.findByEmail(email);
  if (existing) {
    const err = new Error('Email is already registered');
    err.statusCode = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    id: generateId('u'),
    name,
    email,
    passwordHash,
    role: 'user',
    createdAt: new Date().toISOString()
  };

  await userRepo.create(newUser);

  // Auto-login after registration
  const payload = { sub: newUser.id, role: newUser.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  const { passwordHash: _hash, ...safeUser } = newUser;
  return { token, user: safeUser };
}

module.exports = { login, getMe, register };
