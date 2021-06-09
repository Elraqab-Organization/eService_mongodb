const mongoose = require('mongoose');

const proposalsSchema = new mongoose.Schema({
    id: String,
    serviceProviderId: String,
    description: String,
    steps: [],
    fees: Number,

});

module.exports = mongoose.model('proposals', proposalsSchema);