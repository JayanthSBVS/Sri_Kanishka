/**
 * user.repository.js
 * ONLY place that reads/writes users.json.
 * To migrate to a database: replace this file only — services stay unchanged.
 */

const fs = require('fs').promises;
const path = require('path');
const fileLock = require('../utils/fileLock.util');

const DB_PATH = path.join(__dirname, '../../data/users.json');

/**
 * Read all users from file.
 * @returns {Promise<Array>}
 */
async function findAll() {
  const raw = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

/**
 * Find a single user by email (case-insensitive).
 * @param {string} email
 * @returns {Promise<Object|null>}
 */
async function findByEmail(email) {
  const users = await findAll();
  return users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  ) ?? null;
}

/**
 * Find a single user by ID.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
async function findById(id) {
  const users = await findAll();
  return users.find((u) => u.id === id) ?? null;
}

/**
 * Insert a new user. Thread-safe via fileLock.
 * @param {Object} user
 * @returns {Promise<Object>} The saved user
 */
async function create(user) {
  return fileLock.run(DB_PATH, async () => {
    const users = await findAll();
    users.push(user);
    await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2), 'utf8');
    return user;
  });
}

module.exports = { findAll, findByEmail, findById, create };
