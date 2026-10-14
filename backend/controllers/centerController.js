const DaycareCenter = require('../models/DaycareCenter');

// @desc    Get all APPROVED daycare centers with filters (For Parents)
// @route   GET /api/centers
exports.getCenters = async (req, res) => {
  try {
    const { city, is24x7, ageGroup, shiftType, maxPrice, search } = req.query;

    // Only show Admin-approved centers to parents unless requested by Admin
    let query = { verificationStatus: 'APPROVED' };

    if (city) {
      query.city = { $regex: city,$options: 'i' };
    }
    if (search) {
      query.name = { $regex: search,$options: 'i' };
    }
    if (is24x7 === 'true') {
      query.is24x7 = true;
    }
    if (ageGroup) {
      query.ageGroupsSupported = ageGroup.toUpperCase();
    }
    if (shiftType || maxPrice) {
      query.pricingPlans = { $elemMatch: {} };
      if (shiftType) query.pricingPlans.$elemMatch.shiftType = shiftType.toUpperCase();
      if (maxPrice) query.pricingPlans.$elemMatch.priceAmount = {$lte: Number(maxPrice) };
    }

    const centers = await DaycareCenter.find(query).populate('provider', 'name email phone');
    res.status(200).json({ success: true, count: centers.length, data: centers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single daycare center details by ID
// @route   GET /api/centers/:id
exports.getCenterById = async (req, res) => {
  try {
    const center = await DaycareCenter.findById(req.params.id).populate(
      'provider',
      'name email phone'
    );
    if (!center) {
      return res.status(404).json({ success: false, message: 'Daycare center not found' });
    }
    res.status(200).json({ success: true, data: center });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new Daycare Center (Provider only)
// @route   POST /api/centers
exports.createCenter = async (req, res) => {
  try {
    req.body.provider = req.user.id;
    const center = await DaycareCenter.create(req.body);
    res.status(201).json({ success: true, data: center });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get centers owned by logged-in Provider
// @route   GET /api/centers/provider/my-centers
exports.getMyCenters = async (req, res) => {
  try {
    const centers = await DaycareCenter.find({ provider: req.user.id });
    res.status(200).json({ success: true, count: centers.length, data: centers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update center details, caregivers, or pricing plans (Provider only)
// @route   PUT /api/centers/:id
exports.updateCenter = async (req, res) => {
  try {
    let center = await DaycareCenter.findById(req.params.id);
    if (!center) {
      return res.status(404).json({ success: false, message: 'Center not found' });
    }

    if (center.provider.toString() !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this center' });
    }

    center = await DaycareCenter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: center });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Admin: Get all centers (including PENDING) & Verify/Approve a center
// @route   GET /api/centers/admin/all
// @route   PATCH /api/centers/:id/verify
exports.getAllCentersForAdmin = async (req, res) => {
  try {
    const centers = await DaycareCenter.find().populate('provider', 'name email phone');
    res.status(200).json({ success: true, count: centers.length, data: centers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyCenter = async (req, res) => {
  try {
    const { verificationStatus } = req.body; // 'APPROVED' or 'REJECTED'
    const center = await DaycareCenter.findByIdAndUpdate(
      req.params.id,
      {
        verificationStatus,
        $set: { 'certifications.$[].isVerifiedByAdmin': verificationStatus === 'APPROVED' },
      },
      { new: true }
    );

    if (!center) {
      return res.status(404).json({ success: false, message: 'Center not found' });
    }

    res.status(200).json({
      success: true,
      message: `Center status updated to ${verificationStatus}`,
      data: center,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};