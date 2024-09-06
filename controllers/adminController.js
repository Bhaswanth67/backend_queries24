const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');

exports.createInitialAdmin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Check if an initial admin already exists
        const existingAdmin = await Admin.findOne();
        if (existingAdmin) {
            return res.status(400).json({ msg: 'Initial admin already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new admin
        const newAdmin = new Admin({ email, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ msg: 'Initial admin created successfully' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ msg: 'Admin not found' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};



exports.addAdmin = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ msg: 'Admin access required' });
    }

    const { email, password } = req.body;
    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(400).json({ msg: 'Admin already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({ email, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ msg: 'Admin added successfully' });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ msg: 'Admin access required' });
    }

    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Update any user details (Admin only)
exports.updateUser = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ msg: 'Admin access required' });
    }

    const { name, email, password } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Delete any user account (Admin only)
exports.deleteUser = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ msg: 'Admin access required' });
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: 'User deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.editUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};