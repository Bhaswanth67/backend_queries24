const express = require('express');
const router = express.Router();
const { addQuery, addResolution, likeResolution, dislikeResolution, getAllQueries, deleteQuery } = require('../controllers/queryController');
const authMiddleware = require('../middleware/authMiddleware');

// Add a query
router.post('/add', authMiddleware, addQuery);

// Add a resolution to a query
router.post('/add-resolution', authMiddleware, addResolution);

// Like a resolution
router.post('/like', authMiddleware, likeResolution);

// Dislike a resolution
router.post('/dislike', authMiddleware, dislikeResolution);

// Get all queries
router.get('/all', getAllQueries);

// Delete a query
router.delete('/delete/:id', authMiddleware, deleteQuery);

module.exports = router;
