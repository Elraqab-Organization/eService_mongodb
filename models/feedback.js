const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    id: String,
    type: String,
    isGiven: Boolean,
    feedback: String
});

module.exports = mongoose.model('feedback', feedbackSchema);