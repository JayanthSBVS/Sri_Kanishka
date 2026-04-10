/**
 * email.service.js
 * Sends notification emails using Nodemailer via Gmail SMTP.
 */

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendITEnquiryNotification(enquiry) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #1d4ed8, #4f46e5); padding: 28px 32px; color: #fff;">
        <h1 style="margin: 0; font-size: 22px;">📚 New IT Training Enquiry</h1>
        <p style="margin: 6px 0 0; opacity: 0.8; font-size: 14px;">Sri Kanishka Associates — Admin Notification</p>
      </div>
      <div style="padding: 28px 32px; background: #f9fafb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; color: #6b7280; font-size: 13px; width: 130px;">Full Name</td><td style="padding: 10px 0; font-weight: 600; color: #111827;">${enquiry.name}</td></tr>
          <tr><td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Email</td><td style="padding: 10px 0; font-weight: 600; color: #111827;">${enquiry.email}</td></tr>
          <tr><td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Phone</td><td style="padding: 10px 0; font-weight: 600; color: #111827;">${enquiry.phone}</td></tr>
          <tr><td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Course</td><td style="padding: 10px 0; font-weight: 600; color: #1d4ed8;">${enquiry.course}</td></tr>
          <tr><td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Experience</td><td style="padding: 10px 0; font-weight: 600; color: #111827;">${enquiry.experience || 'Not specified'}</td></tr>
          <tr><td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Message</td><td style="padding: 10px 0; color: #374151;">${enquiry.message || '—'}</td></tr>
          <tr><td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Submitted At</td><td style="padding: 10px 0; font-size: 13px; color: #6b7280;">${new Date().toLocaleString('en-IN')}</td></tr>
        </table>
      </div>
      <div style="padding: 18px 32px; background: #fff; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #9ca3af;">
        This is an automated notification from Sri Kanishka Admin System.
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Sri Kanishka Admin" <${process.env.MAIL_USER}>`,
    to: 'srikanishka111@gmail.com',
    subject: `📚 New IT Training Enquiry — ${enquiry.course}`,
    html,
  });
}

module.exports = { sendITEnquiryNotification };
