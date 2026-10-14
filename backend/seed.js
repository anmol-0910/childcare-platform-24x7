const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const DaycareCenter = require('./models/DaycareCenter');
const Booking = require('./models/Booking');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await Booking.deleteMany();
    await DaycareCenter.deleteMany();
    await User.deleteMany();

    const admin = await User.create({
      name: 'Platform Admin',
      email: 'admin@care24.com',
      phone: '9000000001',
      password: 'password123',
      role: 'ADMIN',
      isVerified: true,
    });

    const provider = await User.create({
      name: 'Anjali Verma (Crèche Director)',
      email: 'provider@care24.com',
      phone: '9876543210',
      password: 'password123',
      role: 'PROVIDER',
      isVerified: true,
    });

    const parent = await User.create({
      name: 'Rahul Sharma (Parent)',
      email: 'parent@care24.com',
      phone: '9123456789',
      password: 'password123',
      role: 'PARENT',
      isVerified: true,
    });

    await DaycareCenter.create([
      {
        provider: provider._id,
        name: 'Little Steps 24×7 Night & Day Crèche',
        description: 'Dedicated 24x7 facility for healthcare, IT, and night-shift parents with sleep pods and pediatric nurses.',
        city: 'Raipur',
        address: 'Civil Lines, Near Main Square, Raipur',
        is24x7: true,
        operatingHours: 'Open 24 Hours (Day, Night & Emergency Shifts)',
        ageGroupsSupported: ['INFANT', 'TODDLER', 'PRESCHOOL'],
        safetyMeasures: ['24x7 CCTV Monitored', 'Pediatric Nurse On-Site', 'Biometric Parent Pickup', 'Fire Safety Certified'],
        certifications: [
          { docType: 'ISO Childcare Safety Certificate', docNumber: 'ISO-9001-CR-2026', isVerifiedByAdmin: true },
          { docType: 'Fire & Health Department NOC', docNumber: 'CG-FIRE-8821', isVerifiedByAdmin: true },
        ],
        caregivers: [
          { fullName: 'Meera Nair', qualifications: 'B.Sc Nursing & Infant Care Specialist', experienceYears: 7, backgroundCheckVerified: true },
          { fullName: 'Priya Patel', qualifications: 'Montessori & Early Childhood Diploma', experienceYears: 4, backgroundCheckVerified: true },
        ],
        pricingPlans: [
          { ageGroup: 'INFANT', planType: 'HOURLY', shiftType: 'EMERGENCY', priceAmount: 250 },
          { ageGroup: 'TODDLER', planType: 'DAILY', shiftType: 'NIGHT', priceAmount: 750 },
          { ageGroup: 'TODDLER', planType: 'MONTHLY', shiftType: 'FULL_24_7', priceAmount: 9500 },
        ],
        capacities: [
          { ageGroup: 'INFANT', shiftType: 'NIGHT', maxCapacity: 5 },
          { ageGroup: 'TODDLER', shiftType: 'NIGHT', maxCapacity: 10 },
          { ageGroup: 'TODDLER', shiftType: 'DAY', maxCapacity: 15 },
        ],
        verificationStatus: 'APPROVED',
        rating: 4.9,
      },
      {
        provider: provider._id,
        name: 'Sunshine Montessori & Emergency Daycare',
        description: 'Flexible hourly and monthly daycare with sensory play zones and certified nutrition plans.',
        city: 'Raipur',
        address: 'Shankar Nagar, Sector 2, Raipur',
        is24x7: false,
        operatingHours: '07:00 AM - 10:00 PM',
        ageGroupsSupported: ['TODDLER', 'PRESCHOOL'],
        safetyMeasures: ['Background Verified Staff', 'First-Aid Certified', 'Allergy-Safe Kitchen'],
        certifications: [
          { docType: 'Early Childhood Education Board Registration', docNumber: 'ECE-2025-441', isVerifiedByAdmin: true },
        ],
        caregivers: [
          { fullName: 'Kavita Deshmukh', qualifications: 'M.A. Child Psychology', experienceYears: 8, backgroundCheckVerified: true },
        ],
        pricingPlans: [
          { ageGroup: 'TODDLER', planType: 'HOURLY', shiftType: 'DAY', priceAmount: 180 },
          { ageGroup: 'PRESCHOOL', planType: 'DAILY', shiftType: 'DAY', priceAmount: 600 },
          { ageGroup: 'PRESCHOOL', planType: 'MONTHLY', shiftType: 'DAY', priceAmount: 7000 },
        ],
        capacities: [
          { ageGroup: 'TODDLER', shiftType: 'DAY', maxCapacity: 12 },
          { ageGroup: 'PRESCHOOL', shiftType: 'DAY', maxCapacity: 20 },
        ],
        verificationStatus: 'APPROVED',
        rating: 4.7,
      },
      {
        provider: provider._id,
        name: 'Moonlight Care 24×7 Infant Crèche',
        description: 'Pending verification center specializing in overnight infant care and emergency drop-ins.',
        city: 'Bhopal',
        address: 'Arera Colony, E-4, Bhopal',
        is24x7: true,
        operatingHours: 'Open 24 Hours',
        ageGroupsSupported: ['INFANT', 'TODDLER'],
        safetyMeasures: ['24x7 Nurse Station', 'Smart Crib Monitors'],
        certifications: [
          { docType: 'Municipal Crèche License', docNumber: 'MP-CR-9910', isVerifiedByAdmin: false },
        ],
        caregivers: [
          { fullName: 'Sunita Rao', qualifications: 'Certified Pediatric Caregiver', experienceYears: 5, backgroundCheckVerified: true },
        ],
        pricingPlans: [
          { ageGroup: 'INFANT', planType: 'DAILY', shiftType: 'NIGHT', priceAmount: 900 },
          { ageGroup: 'INFANT', planType: 'MONTHLY', shiftType: 'NIGHT', priceAmount: 11000 },
        ],
        capacities: [
          { ageGroup: 'INFANT', shiftType: 'NIGHT', maxCapacity: 6 },
        ],
        verificationStatus: 'PENDING',
        rating: 4.6,
      },
    ]);

    console.log('Seed Data Imported Successfully!');
    console.log('Test Accounts (Password for all: password123):');
    console.log('- Parent:   parent@care24.com');
    console.log('- Provider: provider@care24.com');
    console.log('- Admin:    admin@care24.com');
    process.exit();
  } catch (error) {
    console.error(`Seed Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();