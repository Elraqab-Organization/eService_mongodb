const mongoose = require('mongoose');
const feedbackSchema = require("./feedback");

const ordersSchema = new mongoose.Schema({

    customerId: {
        type: String,
        default: ""
    },
    serviceProviderId: {
        type: String,
        default: ""
    },
    postId: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: ""
    },
    problemDiscription: {
        type: String,
        default: ""
    },
    serviceDescription: {
        type: String,
        default: ""
    },
    diagnosingFees: {
        type: Number,
        default: ""
    },
    serviceFees: {
        type: Number,
        default: ""
    },
    provisionDate: {
        type: Date,
        default: ""
    },
    timestamp: {
        type: Date,
        default: ""
    },
    responseTime: {
        type: Date,
        default: ""
    },
    // feedback:
    steps: []

});

module.exports = mongoose.model('Order', ordersSchema)