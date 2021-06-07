const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({


    id: String,
    customerId: String,
    timestamp: Date,
    description: String,
    cancelationFee: Boolean,
    tag: [],
    proposal: [{
        id: String,
        postId: String,
        serviceProviderId: String,
        description: String,
        steps: []
    }]

})

module.exports = mongoose.model('Post', postSchema);