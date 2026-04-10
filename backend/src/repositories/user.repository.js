/**
 * user.repository.js
 * Uses Neon PostgreSQL database via db.js.
 */

const db = require('../config/db');

async function findAll() {
  const { rows } = await db.query('SELECT * FROM users');
  return rows;
}

async function findByEmail(email) {
  const { rows } = await db.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
  return rows[0] || null;
}

async function findById(id) {
  const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0] || null;
}

async function create(user) {
  const { id, name, email, passwordHash, role, createdAt } = user;
  await db.query(
    'INSERT INTO users (id, name, email, "passwordHash", role, "createdAt") VALUES ($1, $2, $3, $4, $5, $6)',
    [id, name, email, passwordHash, role, createdAt]
  );
  return user;
}

async function deleteById(id) {
  const { rowCount } = await db.query('DELETE FROM users WHERE id = $1', [id]);
  return rowCount > 0;
}

module.exports = { findAll, findByEmail, findById, create, deleteById };
