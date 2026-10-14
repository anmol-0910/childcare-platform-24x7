const express = require('express');
const {
  getCenters,
  getCenterById,
  createCenter,
  getMyCenters,
  updateCenter,
  getAllCentersForAdmin,
  verifyCenter,
} = require('../controllers/centerController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public / Parent Routes
router.get('/', getCenters);

// Provider Specific Routes
router.get('/provider/my-centers', protect, authorize('PROVIDER', 'ADMIN'), getMyCenters);
router.post('/', protect, authorize('PROVIDER', 'ADMIN'), createCenter);
router.put('/:id', protect, authorize('PROVIDER', 'ADMIN'), updateCenter);

// Admin Specific Routes
router.get('/admin/all', protect, authorize('ADMIN'), getAllCentersForAdmin);
router.patch('/:id/verify', protect, authorize('ADMIN'), verifyCenter);

// Single Center Route (keep at bottom so it doesn't clash with /provider or /admin)
router.get('/:id', getCenterById);

module.exports = router;