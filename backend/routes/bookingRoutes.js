const express = require('express');
const {
  createBooking,
  getParentBookings,
  getProviderBookings,
  updateBookingStatus,
  manageSubscription,
  getAdminKPIs,
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Parent Routes
router.post('/', protect, authorize('PARENT', 'ADMIN'), createBooking);
router.get('/my-bookings', protect, authorize('PARENT', 'ADMIN'), getParentBookings);
router.patch('/:id/subscription', protect, authorize('PARENT', 'ADMIN'), manageSubscription);

// Provider Routes
router.get('/provider', protect, authorize('PROVIDER', 'ADMIN'), getProviderBookings);
router.patch('/:id/status', protect, authorize('PROVIDER', 'ADMIN'), updateBookingStatus);

// Admin KPI Route
router.get('/admin/kpis', protect, authorize('ADMIN'), getAdminKPIs);

module.exports = router;