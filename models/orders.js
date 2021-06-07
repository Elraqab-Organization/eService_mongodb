const mongoose = require('mongoose');
const feedbackSchema = require("./feedback");

const ordersSchema = new mongoose.Schema({

    customerId: String,
    serviceProviderId: String,
    postId: {
        type: String,
        required: false
    },
    status: String,
    problemDiscription: String,
    serviceDescription: String,
    diagnosingFees: Number,
    serviceFees: Number,
    provisionDate: Date,
    timestamp: Date,
    paymentMethod: String,
    responseTime: Date,
    // feedback:
    steps: []

});

module.exports = mongoose.model('Order', ordersSchema)