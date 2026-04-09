/**
 * matrimony.repository.js
 * ONLY place that reads/writes matrimony_profiles.json.
 * To migrate to a database: replace this file only — services stay unchanged.
 */

const fs = require('fs').promises;
const path = require('path');
const fileLock = require('../utils/fileLock.util');

const DB_PATH = path.join(__dirname, '../../data/matrimony_profiles.json');

/**
 * Read all profiles from file.
 * @returns {Promise<Array>}
 */
async function findAll() {
  const raw = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

/**
 * Find a profile by its ID.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
async function findById(id) {
  const profiles = await findAll();
  return profiles.find((p) => p.id === id) ?? null;
}

/**
 * Return only profiles where status === 'active'.
 * @returns {Promise<Array>}
 */
async function findActive() {
  const profiles = await findAll();
  return profiles.filter((p) => p.status === 'active');
}

/**
 * Insert a new profile. Thread-safe via fileLock.
 * @param {Object} profile
 * @returns {Promise<Object>} The saved profile
 */
async function create(profile) {
  return fileLock.run(DB_PATH, async () => {
    const profiles = await findAll();
    profiles.push(profile);
    await fs.writeFile(DB_PATH, JSON.stringify(profiles, null, 2), 'utf8');
    return profile;
  });
}

/**
 * Update fields on an existing profile by ID. Thread-safe via fileLock.
 * @param {string} id
 * @param {Object} updates - Partial fields to merge
 * @returns {Promise<Object|null>} The updated profile, or null if not found
 */
async function updateById(id, updates) {
  return fileLock.run(DB_PATH, async () => {
    const profiles = await findAll();
    const index = profiles.findIndex((p) => p.id === id);
    if (index === -1) return null;

    profiles[index] = {
      ...profiles[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await fs.writeFile(DB_PATH, JSON.stringify(profiles, null, 2), 'utf8');
    return profiles[index];
  });
}

/**
 * Find a profile by userId.
 * @param {string} userId
 * @returns {Promise<Object|null>}
 */
async function findByUserId(userId) {
  const profiles = await findAll();
  return profiles.find((p) => p.userId === userId) ?? null;
}

/**
 * Find a profile by its email.
 * @param {string} email
 * @returns {Promise<Object|null>}
 */
async function findByEmail(email) {
  const profiles = await findAll();
  return profiles.find((p) => p.email === email) ?? null;
}

module.exports = { findAll, findById, findActive, create, updateById, findByUserId, findByEmail };
