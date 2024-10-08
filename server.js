require('dotenv').config(); // Default dotenv config
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI; // Correct reference to MONGO_URI from secret files
const jwtSecret = process.env.JWT_SECRET; // Correct reference to JWT_SECRET from secret files

// Check if the MongoDB URI is defined
if (!mongoURI) {
    console.error('MONGO_URI environment variable is not defined.');
    process.exit(1); // Exit the process with failure
} else {
    console.log('MONGO_URI:', mongoURI); // Debug log to verify the variable
}


mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process if MongoDB connection fails
    });

// Middleware
app.use(helmet()); // Adds security headers
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const queryRoutes = require('./routes/queryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
