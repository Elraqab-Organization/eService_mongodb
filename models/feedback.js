const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({

    type: {
        type: String,
        default: "",
    },
    isGiven: {
        type: Boolean,
        default: false,
    },
    feedback: {
        type: String,
        default: "",
    },
    rate: {
        type: Number,
        default: 1,
    },
});

module.exports = mongoose.model('feedback', feedbackSchema);
