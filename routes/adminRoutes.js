// adminRoutes.js
const express = require('express');
const router = express.Router();
const { adminLogin, addAdmin, createInitialAdmin, getAllUsers, editUser, deleteUser } = require('../controllers/adminController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

// Initial admin creation (no authentication required)
router.post('/create-initial-admin', createInitialAdmin);

// Admin login route
router.post('/login', adminLogin);

// Add a new admin (Protected route for admins only)
router.post('/add', adminAuthMiddleware, addAdmin);

// Get all users (Admin only)
router.get('/users', adminAuthMiddleware, getAllUsers);

// Edit user details (Admin only)
router.put('/users/:id', adminAuthMiddleware, editUser);

// Delete user (Admin only)
router.delete('/users/:id', adminAuthMiddleware, deleteUser);

module.exports = router;
