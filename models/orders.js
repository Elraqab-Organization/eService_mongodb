const mongoose = require('mongoose');
const feedbackSchema = require("./feedback");
const userSchema = require("./user");


const ordersSchema = new mongoose.Schema({

    customer: {
        type: userSchema,
        required: true,
        default: {}
    },
    serviceProvider: {
        type: userSchema,
        required: true,
        default: {}
    },
    feedback: {
        type: String,
        default: "",
    },
    rate: {
        type: Number,
        default: 1,
    },
    isFeedbackGiven: {
        type: Boolean,
        default: false,
    },
    customerId: {
        type: String,
        default: "",
        required: true,
    },
    serviceProviderId: {
        type: String,
        default: "",
        required: true,
    },
    postId: {
        type: String,
        default: "",
    },
    feedbackId: {
        type: String,
        default: "",
        required: true,
    },
    status: {
        type: String,
        default: "",
        required: true,
    },
    problemDescription: {
        type: String,
        default: "",
        required: true,
    },
    serviceDescription: {
        type: String,
        default: "",
        required: true,
    },
    serviceFees: {
        type: Number,
        default: "",
        required: true,
    },
    paymentMethod: {
        type: String,
        default: "",
        required: true,
    },
    provisionDate: {
        type: String,
        default: "",
        required: true,
    },
    responseTime: {
        type: String,
        default: "",
        required: true,
    },
    steps: {
        type: [String],
        default: [],
        required: true,
    },
    location: {
        type: String,
        default: "",
        required: true
    },

});

module.exports = mongoose.model('Order', ordersSchema)