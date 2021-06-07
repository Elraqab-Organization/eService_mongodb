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
        lat: Number
    }],

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
    notification: {
        showNotification: Boolean,
        allowNotificationDot: Boolean,
        excutivePrograms: Boolean,
        discountsAnddeals: Boolean,
    },
    notificationList: [],
    //to be moved to its own api
    favouriteServiceProviders: [],
    favouriteCategories: [],
    // ordersList: [ordersSchema],


});

module.exports = mongoose.model('User', userSchema);