const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Encrypt password for security requirement
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // In production, save this user to your MongoDB using your User model
    const newUser = { name, email, password: hashedPassword, role };

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // In production, fetch user from MongoDB and compare passwords here
    
    // Generate secure token for role-based access
    const token = jwt.sign(
      { email, role: 'parent' }, 
      process.env.JWT_SECRET || 'YOUR_SECRET_KEY', 
      { expiresIn: '24h' }
    );

    res.json({ token, user: { email, role: 'parent' } });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

module.exports = router;