const mongoose = require('mongoose');
const ordersSchema = require("./orders")
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,

    name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: String,
    phoneNumber: Number,
    country: String,
    city: String,
    lag: Number,
    lat: Number,
    postalCode: String,
    token: String,
    profileImgSrc: String,
    displayLanguage: String,
    address: [{
            name: String,
            description: String,
            lug: Number,
            lat: Number,
            default: {}
        },

    ],
    paymentMethod: [{

        name: String,
        active: Boolean,
        type: String,
        card: [{
            name: String,
            cardNumber: Number,
            expiryMonth: Number,
            expiryYear: Number,
            primary: Boolean
        }]

    }],
    //to be moved to its own api
    notificationSettings: {
        showNotification: Boolean,
        allowNotificationDot: Boolean,
        excutivePrograms: Boolean,
        discountsAnddeals: Boolean,
    },
    notificationList: {
        type: Array,
        default: []
    },
    //to be moved to its own api
    favouriteServiceProviders: {
        type: Array,
        default: []
    },
    favouriteCategories: {
        type: Array,
        default: []
    },
    // ordersList: [ordersSchema],


});

module.exports = mongoose.model('User', userSchema);