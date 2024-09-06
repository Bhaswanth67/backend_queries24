const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Get user profile
router.get('/profile', authMiddleware, getUserProfile);

// Update user profile
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
