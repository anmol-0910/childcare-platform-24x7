const mongoose = require('mongoose');

const caregiverSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  qualifications: { type: String, required: true },
  experienceYears: { type: Number, required: true },
  backgroundCheckVerified: { type: Boolean, default: false },
  photoUrl: { type: String, default: '' },
});

const pricingPlanSchema = new mongoose.Schema({
  ageGroup: {
    type: String,
    enum: ['INFANT', 'TODDLER', 'PRESCHOOL'],
    required: true,
  },
  planType: {
    type: String,
    enum: ['HOURLY', 'DAILY', 'MONTHLY'],
    required: true,
  },
  shiftType: {
    type: String,
    enum: ['DAY', 'NIGHT', 'EMERGENCY', 'FULL_24_7'],
    required: true,
  },
  priceAmount: { type: Number, required: true },
});

const capacitySlotSchema = new mongoose.Schema({
  ageGroup: {
    type: String,
    enum: ['INFANT', 'TODDLER', 'PRESCHOOL'],
    required: true,
  },
  shiftType: {
    type: String,
    enum: ['DAY', 'NIGHT', 'EMERGENCY'],
    required: true,
  },
  maxCapacity: { type: Number, required: true },
});

const daycareCenterSchema = new mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide the daycare center name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description of the facility'],
    },
    city: {
      type: String,
      required: [true, 'Please specify the city'],
      index: true,
    },
    address: {
      type: String,
      required: [true, 'Please provide the full address'],
    },
    is24x7: {
      type: Boolean,
      default: false,
    },
    operatingHours: {
      type: String,
      default: '08:00 AM - 08:00 PM',
    },
    ageGroupsSupported: [
      {
        type: String,
        enum: ['INFANT', 'TODDLER', 'PRESCHOOL'],
      },
    ],
    safetyMeasures: [{ type: String }], // e.g., ["CCTV Monitored", "Fire Safety Certified", "First Aid Staff"]
    certifications: [
      {
        docType: { type: String, required: true }, // e.g., "Fire Safety", "Crèche License"
        docNumber: { type: String, required: true },
        isVerifiedByAdmin: { type: Boolean, default: false },
      },
    ],
    photos: [{ type: String }],
    caregivers: [caregiverSchema],
    pricingPlans: [pricingPlanSchema],
    capacities: [capacitySlotSchema],
    verificationStatus: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
    rating: {
      type: Number,
      default: 4.5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DaycareCenter', daycareCenterSchema);