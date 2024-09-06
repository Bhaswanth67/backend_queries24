require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const queryRoutes = require('./routes/queryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');  // New user routes

app.use('/api/auth', authRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);  // Include user routes

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
