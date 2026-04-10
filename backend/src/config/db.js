const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "passwordHash" VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS matrimony_profiles (
        id VARCHAR(255) PRIMARY KEY,
        "userId" VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        "passwordHash" VARCHAR(255) NOT NULL,
        "firstName" VARCHAR(255),
        "lastName" VARCHAR(255),
        phone VARCHAR(50),
        "profileData" JSONB,
        "profilePhoto" VARCHAR(255),
        status VARCHAR(50) DEFAULT 'active',
        "paymentStatus" VARCHAR(50) DEFAULT 'unpaid',
        "transactionId" VARCHAR(255),
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS it_training_enquiries (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        course VARCHAR(255) NOT NULL,
        experience VARCHAR(100),
        message TEXT,
        status VARCHAR(50) DEFAULT 'new',
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create default admin user securely
    const bcrypt = require('bcryptjs');
    const adminHash = bcrypt.hashSync('Admin@123', 10);
    await client.query(`
      INSERT INTO users (id, name, email, "passwordHash", role)
      VALUES ('admin-001', 'Admin', 'admin@srikanishka.com', $1, 'admin')
      ON CONFLICT (email) DO NOTHING;
    `, [adminHash]);

    console.log('Database tables initialized successfully.');
  } catch (err) {
    console.error('Error initializing database tables:', err);
  } finally {
    client.release();
  }
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  initDB,
  pool
};
