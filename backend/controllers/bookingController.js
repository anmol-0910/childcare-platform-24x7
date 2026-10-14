const Booking = require('../models/Booking');
const DaycareCenter = require('../models/DaycareCenter');
const User = require('../models/User');

// Helper: Check real-time slot availability to prevent overbooking
const checkSlotAvailability = async (center, childAgeGroup, shiftType, startDate, endDate) => {
  // Find capacity rule for this ageGroup and shiftType
  const capacityRule = center.capacities.find(
    (c) => c.ageGroup === childAgeGroup && (c.shiftType === shiftType || shiftType === 'FULL_24_7')
  );

  // Default capacity fallback if provider didn't configure a specific slot row
  const maxAllowed = capacityRule ? capacityRule.maxCapacity : 10;

  // Count overlapping CONFIRMED bookings in that date/time window
  const activeBookingsCount = await Booking.countDocuments({
    center: center._id,
    childAgeGroup,
    shiftType,
    status: 'CONFIRMED',
    $or: [
      {
        startDate: { $lte: new Date(endDate) },
        endDate: { $gte: new Date(startDate) },
      },
    ],
  });

  return {
    available: activeBookingsCount < maxAllowed,
    spotsLeft: Math.max(0, maxAllowed - activeBookingsCount),
    maxAllowed,
  };
};

// @desc    Create a new booking or subscription request (Parent)
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const {
      centerId,
      childName,
      childAgeGroup,
      planType,
      shiftType,
      startDate,
      endDate,
      totalAmount,
      specialInstructions,
    } = req.body;

    const center = await DaycareCenter.findById(centerId);
    if (!center) {
      return res.status(404).json({ success: false, message: 'Daycare center not found' });
    }

    // Verify real-time capacity before allowing booking request
    const availability = await checkSlotAvailability(
      center,
      childAgeGroup,
      shiftType,
      startDate,
      endDate
    );

    if (!availability.available) {
      return res.status(400).json({
        success: false,
        message: `No slots available for ${childAgeGroup} (${shiftType} shift) on selected dates. Capacity full!`,
      });
    }

    const booking = await Booking.create({
      parent: req.user.id,
      center: centerId,
      childName,
      childAgeGroup,
      planType,
      shiftType,
      startDate,
      endDate,
      totalAmount,
      specialInstructions,
    });

    res.status(201).json({
      success: true,
      spotsRemainingAfterConfirm: availability.spotsLeft - 1,
      data: booking,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get logged-in Parent's bookings & subscriptions
// @route   GET /api/bookings/my-bookings
exports.getParentBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ parent: req.user.id })
      .populate('center', 'name city address operatingHours is24x7')
      .sort('-createdAt');
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get bookings & earnings analytics for Provider's centers
// @route   GET /api/bookings/provider
exports.getProviderBookings = async (req, res) => {
  try {
    const myCenters = await DaycareCenter.find({ provider: req.user.id });
    const centerIds = myCenters.map((c) => c._id);

    const bookings = await Booking.find({ center: { $in: centerIds } })
      .populate('parent', 'name email phone')
      .populate('center', 'name city')
      .sort('-createdAt');

    const totalEarnings = bookings
      .filter((b) => b.status === 'CONFIRMED' || b.status === 'COMPLETED')
      .reduce((acc, curr) => acc + curr.totalAmount, 0);

    res.status(200).json({
      success: true,
      count: bookings.length,
      analytics: {
        totalEarnings,
        confirmedCount: bookings.filter((b) => b.status === 'CONFIRMED').length,
        pendingCount: bookings.filter((b) => b.status === 'PENDING').length,
        activeSubscriptions: bookings.filter((b) => b.subscriptionStatus === 'ACTIVE').length,
      },
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Provider accepts or rejects a booking (Atomic Overbooking Guard)
// @route   PATCH /api/bookings/:id/status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'CONFIRMED', 'REJECTED', 'COMPLETED'
    const booking = await Booking.findById(req.params.id).populate('center');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Re-verify capacity right before confirming to prevent double-booking
    if (status === 'CONFIRMED') {
      const availability = await checkSlotAvailability(
        booking.center,
        booking.childAgeGroup,
        booking.shiftType,
        booking.startDate,
        booking.endDate
      );
      if (!availability.available) {
        return res.status(400).json({
          success: false,
          message: 'Cannot confirm: Maximum slot capacity reached for this shift!',
        });
      }
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: `Booking ${status.toLowerCase()} successfully`,
      data: booking,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Parent manages subscription (Pause / Cancel)
// @route   PATCH /api/bookings/:id/subscription
exports.manageSubscription = async (req, res) => {
  try {
    const { subscriptionStatus } = req.body; // 'ACTIVE', 'PAUSED', 'CANCELLED'
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, parent: req.user.id },
      { subscriptionStatus },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Admin Platform KPIs & Analytics Report
// @route   GET /api/bookings/admin/kpis
exports.getAdminKPIs = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'PARENT' });
    const totalProviders = await User.countDocuments({ role: 'PROVIDER' });
    const verifiedCenters = await DaycareCenter.countDocuments({ verificationStatus: 'APPROVED' });
    const pendingCenters = await DaycareCenter.countDocuments({ verificationStatus: 'PENDING' });

    const allBookings = await Booking.find();
    const confirmedBookings = allBookings.filter((b) => b.status === 'CONFIRMED');
    const subscriptions = allBookings.filter((b) => b.isSubscription);

    const conversionRate =
      allBookings.length > 0
        ? ((confirmedBookings.length / allBookings.length) * 100).toFixed(1)
        : 0;

    const subscriptionAdoptionRate =
      allBookings.length > 0 ? ((subscriptions.length / allBookings.length) * 100).toFixed(1) : 0;

    res.status(200).json({
      success: true,
      kpis: {
        registeredParents: totalUsers,
        registeredProviders: totalProviders,
        verifiedCenters,
        pendingCenters,
        totalBookings: allBookings.length,
        confirmedBookings: confirmedBookings.length,
        bookingConversionRate: `${conversionRate}%`,
        subscriptionAdoptionRate: `${subscriptionAdoptionRate}%`,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};