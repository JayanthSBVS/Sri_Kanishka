/**
 * app.js
 * Express application configuration.
 * Separated from server.js for easier testing and Vercel compatibility.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const matrimonyRoutes = require('./routes/matrimony.routes');
const adminRoutes = require('./routes/admin.routes');
const itTrainingRoutes = require('./routes/it-training.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

// ── CORS ────────────────────────────────────────────────────────────────────
// Allow requests from the Vite dev server and any production origin
const allowedOrigins = [
  'http://localhost:5173',  // Main app (Vite)
  'http://localhost:5174',  // Admin panel (Vite)
  'http://localhost:3000',
  process.env.FRONTEND_URL, // Set in production
  process.env.ADMIN_URL,    // Admin panel in production
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, curl, mobile apps)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
    credentials: true,
  })
);

// ── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

// ── Static Files ─────────────────────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/matrimony', matrimonyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/it-training', itTrainingRoutes);

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global Error Handler (must be last) ──────────────────────────────────────
app.use(errorMiddleware);

module.exports = app;
