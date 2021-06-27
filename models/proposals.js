const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    id: {
        type: String,
        default: ""
    },
    post: "",
    customer: "",
    serviceProvider: "",
    postId: "",
    customerId: "",
    status: {
        type: String,
        default: "Pending",
        required: true
    },
    serviceProviderId: "",
    description: {
        type: String,
        default: ""
    },
    steps: [{ type: String, default: "" },],
    provisionDate: {
        type: String,
        default: ""
    },
    time: {
        type: String,
        default: ""
    },

});

module.exports = mongoose.model('Proposal', proposalSchema);