const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { getUserProfile, updateUserProfile, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Get user profile
router.get('/profile', authMiddleware, getUserProfile);

// Update user profile
router.put('/profile', authMiddleware, updateUserProfile);

// Delete user account
router.delete('/profile', authMiddleware, deleteUser); // Ensure the endpoint matches your needs

module.exports = router;
