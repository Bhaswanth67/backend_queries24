require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI;

// Check if the MongoDB URI is defined
if (!mongoURI) {
    console.error('MONGODB_URI environment variable is not defined.');
    process.exit(1); // Exit the process with failure
}

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

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
