const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    center: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DaycareCenter',
      required: true,
    },
    childName: {
      type: String,
      required: [true, 'Please provide the child name'],
      trim: true,
    },
    childAgeGroup: {
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
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isSubscription: {
      type: Boolean,
      default: function () {
        return this.planType === 'MONTHLY';
      },
    },
    subscriptionStatus: {
      type: String,
      enum: ['NONE', 'ACTIVE', 'PAUSED', 'CANCELLED'],
      default: function () {
        return this.planType === 'MONTHLY' ? 'ACTIVE' : 'NONE';
      },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'REJECTED', 'COMPLETED', 'CANCELLED'],
      default: 'PENDING',
    },
    specialInstructions: {
      type: String,
      default: '',
    },
    feedback: {
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);