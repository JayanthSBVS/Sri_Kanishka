/**
 * it-training.routes.js
 * Public endpoints for IT Training enquiry submissions.
 */

const { Router } = require('express');
const router = Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');
const { sendITEnquiryNotification } = require('../services/email.service');

/**
 * POST /api/it-training/enquiry
 * Saves an IT Training course enquiry and sends email notification.
 */
router.post('/enquiry', async (req, res, next) => {
  try {
    const { name, email, phone, course, experience, message } = req.body;

    if (!name || !email || !phone || !course) {
      return res.status(400).json({ success: false, message: 'Name, email, phone and course are required.' });
    }

    const id = 'IT-' + uuidv4().substring(0, 8).toUpperCase();

    await db.query(
      `INSERT INTO it_training_enquiries (id, name, email, phone, course, experience, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, name, email, phone, course, experience || null, message || null]
    );

    // Send email notification (non-blocking — don't fail the request if email fails)
    sendITEnquiryNotification({ id, name, email, phone, course, experience, message })
      .catch(err => console.error('Email send failed:', err.message));

    res.json({ success: true, message: 'Enquiry submitted successfully! We will contact you soon.' });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/it-training/enquiries  (Admin only -- called from admin panel)
 */
router.get('/enquiries', async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM it_training_enquiries ORDER BY "createdAt" DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/it-training/enquiries/:id/status
 */
router.patch('/enquiries/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await db.query('UPDATE it_training_enquiries SET status = $1 WHERE id = $2', [status, id]);
    res.json({ success: true, message: 'Status updated.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
