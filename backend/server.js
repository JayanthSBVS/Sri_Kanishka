/**
 * server.js
 * Entry point — starts the HTTP server.
 * app.js is kept separate so it can be imported for Vercel or testing.
 */

require('dotenv').config();
const app = require('./src/app');
const { initDB } = require('./src/config/db');

const PORT = process.env.PORT || 5000;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log('');
    console.log('  ┌─────────────────────────────────────────────┐');
    console.log(`  │  Sri-Kanishka Backend running on :${PORT}      │`);
    console.log('  │  Health: http://localhost:' + PORT + '/api/health   │');
    console.log('  └─────────────────────────────────────────────┘');
    console.log('');
  });
});
