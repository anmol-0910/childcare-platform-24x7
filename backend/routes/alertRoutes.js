const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Set up Nodemailer with your email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'alerts@littlesteps.com', pass: 'your-app-password' }
});

// POST /api/alerts/notify
router.post('/notify', async (req, res) => {
  try {
    const { userEmail, childName, centerName, status } = req.body;

    const mailOptions = {
      from: 'alerts@littlesteps.com',
      to: userEmail,
      subject: `Little Steps: Booking ${status}`,
      text: `Hello! Your childcare booking for ${childName} at ${centerName} is now ${status}.`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Alert notification sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send alert notification' });
  }
});

module.exports = router;