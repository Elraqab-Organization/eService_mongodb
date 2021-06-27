const mongoose = require('mongoose');
const User = require("../models/user");
const requestSchema = new mongoose.Schema({

    id: {
        type: String,
        default: ""
    },
    customerId: {
        type: String,
        default: ""
    },
    serviceProviderId: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "Pending",
        required: true
    },
    fees: {
        type: Number,
        default: 0.0
    },
    customer: "",
    serviceProvider: "",
    provisionDate: {
        default: ""
    },
    time: {
        default: ""
    },
})


module.exports = mongoose.model('Request', requestSchema);
