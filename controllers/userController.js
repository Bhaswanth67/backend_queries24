const User = require('../models/User');

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Delete user account
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id); // Use req.user._id for consistency
        res.json({ msg: 'User account deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
