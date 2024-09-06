const Query = require('../models/Query');
const User = require('../models/User');

// Add a query
exports.addQuery = async (req, res) => {
    try {
        const { text } = req.body;
        const newQuery = new Query({
            text,
            postedBy: req.user._id
        });
        await newQuery.save();
        res.status(201).json(newQuery);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Add a resolution to a query
exports.addResolution = async (req, res) => {
    try {
        const { queryId, text } = req.body;
        const resolution = {
            text,
            resolvedBy: req.user._id
        };
        const query = await Query.findById(queryId);
        if (!query) return res.status(404).json({ msg: 'Query not found' });
        query.resolutions.push(resolution);
        await query.save();
        res.status(200).json(query);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Like a resolution
exports.likeResolution = async (req, res) => {
    try {
        const { queryId, resolutionId } = req.body;
        const query = await Query.findById(queryId);
        if (!query) return res.status(404).json({ msg: 'Query not found' });

        const resolution = query.resolutions.id(resolutionId);
        if (!resolution) return res.status(404).json({ msg: 'Resolution not found' });

        if (resolution.likedBy.includes(req.user._id)) {
            return res.status(400).json({ msg: 'You have already liked this resolution' });
        }

        resolution.likes += 1;
        resolution.likedBy.push(req.user._id); // Track user
        await query.save();
        res.status(200).json(resolution);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Dislike a resolution
exports.dislikeResolution = async (req, res) => {
    try {
        const { queryId, resolutionId } = req.body;
        const query = await Query.findById(queryId);
        if (!query) return res.status(404).json({ msg: 'Query not found' });

        const resolution = query.resolutions.id(resolutionId);
        if (!resolution) return res.status(404).json({ msg: 'Resolution not found' });

        if (resolution.dislikedBy.includes(req.user._id)) {
            return res.status(400).json({ msg: 'You have already disliked this resolution' });
        }

        resolution.dislikes += 1;
        resolution.dislikedBy.push(req.user._id); // Track user
        await query.save();
        res.status(200).json(resolution);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get all queries
exports.getAllQueries = async (req, res) => {
    try {
        const queries = await Query.find();
        res.status(200).json(queries);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Delete a query
exports.deleteQuery = async (req, res) => {
    try {
        const query = await Query.findById(req.params.id);
        if (!query) return res.status(404).json({ msg: 'Query not found' });

        if (req.user.isAdmin || query.postedBy.toString() === req.user._id.toString()) {
            await query.remove();
            return res.status(200).json({ msg: 'Query deleted' });
        } else {
            return res.status(403).json({ msg: 'Permission denied' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
