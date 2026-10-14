const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Mount API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/centers', require('./routes/centerRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Serve Frontend Static Files (automatically serves index.html at '/')
// Basic route for the API root
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Little Steps Backend API is running successfully!' });
});
// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ----------------------------------------------------------------
// VERCEL FIX: Only listen locally. Export the app for production.
// ----------------------------------------------------------------
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`);
    server.close(() => process.exit(1));
  });
}

// Export the app for Vercel Serverless Functions
module.exports = app;