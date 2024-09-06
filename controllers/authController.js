const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if all required fields are provided
        if (!email || !username || !password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

        // Create a new user
        const newUser = new User({
            email,
            username,
            password: hashedPassword // Save the hashed password
        });

        await newUser.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error('Error in registerUser:', err); // Log the error to the console
        res.status(500).json({ msg: 'Server Error', error: err.message }); // Include error details in the response
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if all required fields are provided
        if (!email || !password) {
            return res.status(400).json({ msg: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User not found' });
        
        const isMatch = await bcrypt.compare(password, user.password); // Compare hashed password
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Error in loginUser:', err); // Log the error to the console
        res.status(500).json({ msg: 'Server Error', error: err.message }); // Include error details in the response
    }
};
