export const API_BASE = 'https://childcare-platform-24x7.vercel.app/api';

export const FACILITIES_LIST = [
  { id: 'all', title: 'All Facilities (0 to 12 yrs)', subtitle: 'Complete 24×7 Childcare & Crèche', icon: 'users' },
  { id: 'Night', title: '24×7 & Night Shift Care', subtitle: 'Safe sleep pods for working parents', icon: 'moon' },
  { id: 'Infant', title: 'Infant & Neonatal Care', subtitle: 'Dedicated 1:2 nurse-to-infant ratio', icon: 'baby' },
  { id: 'Nutrition', title: 'Nutrition & Dietetics', subtitle: 'Fresh pediatrician-approved meals', icon: 'apple' },
  { id: 'Growth', title: 'Growth & Early Development', subtitle: 'Montessori & sensory playzones', icon: 'globe' },
  { id: 'Special', title: 'Developmental & Autism Support', subtitle: 'Certified special-needs educators', icon: 'sparkles' },
  { id: 'Speech', title: 'Speech & Hearing Therapy', subtitle: 'Interactive phonics & communication', icon: 'book' }
];

export const INITIAL_CENTERS = [
  {
    _id: 'c1',
    name: 'Little Steps 24×7 Crèche & Children Center',
    location: 'Shailendra Nagar, Raipur',
    phone: '+91 92445-67677',
    is24x7: true,
    verified: true,
    capacity: 30,
    enrolled: 21,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
    ],
    ageGroups: ['Infant', 'Toddler', 'Preschool'],
    shifts: ['Day', 'Night', 'Emergency'],
    facilities: ['Night', 'Infant', 'Nutrition', 'Growth', 'Speech'],
    pricing: { hourly: 150, daily: 550, monthly: 4200 },
    caregivers: [
      { name: 'Dr. Pawan Jain', role: 'Senior Pediatric Advisor', exp: '20 yrs', cert: 'MD Pediatrics' },
      { name: 'Sunita Verma', role: 'Lead Neonatal & Crèche Nurse', exp: '10 yrs', cert: 'First-Aid & CPR' }
    ],
    safety: ['24×7 CCTV Monitored', 'Police-Verified Staff', 'Biometric Entry', 'Pediatrician On-Call']
  },
  {
    _id: 'c2',
    name: 'SafeNest Night-Shift & Working Parent Crèche',
    location: 'Shankar Nagar, Raipur',
    phone: '+91 771-7964942',
    is24x7: true,
    verified: true,
    capacity: 24,
    enrolled: 16,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80'
    ],
    ageGroups: ['Infant', 'Toddler'],
    shifts: ['Day', 'Night', 'Emergency'],
    facilities: ['Night', 'Infant', 'Nutrition', 'Special'],
    pricing: { hourly: 180, daily: 650, monthly: 4800 },
    caregivers: [
      { name: 'Dr. Kavita Rao', role: 'Child Nutrition & Sleep Specialist', exp: '12 yrs', cert: 'Pediatric Nutrition' },
      { name: 'Anita Deshmukh', role: 'Night-Shift Infant Caregiver', exp: '7 yrs', cert: 'Police Verified' }
    ],
    safety: ['Sanitized Night Sleep Pods', 'Fire Safety Certified', 'Live App Updates', 'Emergency Pediatric Tie-up']
  },
  {
    _id: 'c3',
    name: 'BloomBuds Montessori & Early Development Center',
    location: 'Civil Lines, Raipur',
    phone: '+91 98260-11223',
    is24x7: false,
    verified: true,
    capacity: 40,
    enrolled: 29,
    rating: 4.7,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80'
    ],
    ageGroups: ['Toddler', 'Preschool'],
    shifts: ['Day'],
    facilities: ['Growth', 'Nutrition', 'Speech', 'Special'],
    pricing: { hourly: 120, daily: 450, monthly: 3200 },
    caregivers: [
      { name: 'Neha Tiwari', role: 'Early Childhood Coordinator', exp: '8 yrs', cert: 'B.Ed Montessori' }
    ],
    safety: ['Childproof Playzones', 'Daily Hygiene Audit', 'First-Aid Certified Staff']
  }
];