const mongoose = require('mongoose');


const ResolutionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Add this
    dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Add this
});


const QuerySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resolutions: [ResolutionSchema],
    resolvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Query', QuerySchema);
