const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
  post: "",
  customer: "",
  serviceProvider: "",
  postId: "",
  customerId: { type: String },
  status: {
    type: String,
    default: "Pending",
    required: true,
  },
  serviceProviderId: "",
  description: {
    type: String,
    default: "",
  },
  diagnosisFee: { type: String },
  steps: [{ type: String, default: "" }],
  provisionDate: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Proposal", proposalSchema);
