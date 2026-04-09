/**
 * id.util.js
 * Generates unique IDs for records.
 * Using crypto.randomUUID() (built in to Node 14.17+) — no extra dependency.
 */

const { randomUUID } = require('crypto');

/**
 * @param {string} prefix - Short prefix like 'u', 'mp'
 * @returns {string} e.g. "mp-550e8400-e29b-41d4-a716-446655440000"
 */
function generateId(prefix = '') {
  const uuid = randomUUID();
  return prefix ? `${prefix}-${uuid}` : uuid;
}

module.exports = { generateId };
