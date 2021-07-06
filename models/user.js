const mongoose = require('mongoose');
const ordersSchema = require("./orders")
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: null,
    },
    firstName: {
        type: String,
        default: null,
    },
    lastName: {
        type: String,
        default: null,
    },
    fullName: {
        type: String,
        default: null,
    },
    imgSrc: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        default: null,
    },
    gender: {
        type: String,
        default: null,
    },
    jobDescription: {
        type: String,
        default: null,
    },
    rate: {
        type: Number,
        default: null,
    },
    diagnosingFees: {
        type: Number,
        default: null,
    },
    city: {
        type: String,
        default: null,
    },
    country: {
        type: String,
        default: null,
    },
    phoneNumber: {
        type: String,
        default: null,
    },
    postalCode: {
        type: String,
        default: null,
    },
    long: {
        type: String,
        default: null,
    },
    lat: {
        type: String,
        default: null,
    },
    displayLanguage: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        default: null,
    },
    isServiceProvider: {
        type: Boolean,
        default: null,
    },
    isCashPaymentActive: {
        type: Boolean,
        default: null,
    },
    jobName: {
        type: String,
        default: "customer",
    },
    notification: {
        showNotificatoin: {
            type: Boolean,
            default: null,
        },
        allowNotificationDot: {
            type: Boolean,
            default: null,
        },
        excutivePrograms: {
            type: Boolean,
            default: null,
        },
        discountsDeals: {
            type: Boolean,
            default: null,
        }
    },
});

module.exports = mongoose.model('User', userSchema);