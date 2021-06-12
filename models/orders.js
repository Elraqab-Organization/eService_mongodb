const mongoose = require('mongoose');
const feedbackSchema = require("./feedback");
const userSchema = require("./user");

const ordersSchema = new mongoose.Schema({

    customerId: {
        type: String,
        default: "",
        required: true,
    },
    user: {
        type: userSchema,
        required: true,
        default: {}
    },
    customer: {
        type: userSchema,
        required: true,
        default: {}
    },
    serviceProviderId: {
        type: String,
        default: "",
        required: true,
    },
    postId: {
        type: String,
        default: "",
        required: true,
    },
    status: {
        type: String,
        default: "",
        required: true,
    },
    problemDiscription: {
        type: String,
        default: "",
        required: true,
    },
    serviceDescription: {
        type: String,
        default: "",
        required: true,
    },
    diagnosingFees: {
        type: Number,
        default: "",
        required: true,
    },
    serviceFees: {
        type: Number,
        default: "",
        required: true,
    },
    provisionDate: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    responseTime: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    // feedback:
    steps: [],
    city: {
        type: String,
        default: "",
        required: true
    },
    time: {
        type: String,
        default: "",
        required: true
    },
    day: {
        type: String,
        default: "",
        required: true
    }

});

module.exports = mongoose.model('Order', ordersSchema)