const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  customerId: { type: String },
  timestamp: { type: Date, default: Date.now },
  description: { type: String, required: true },
  location: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  cancelationFee: { type: String, required: true },
  tags: [String],
  proposal: [
    {
      proposalId: { type: String },
      diagnosisFee: { type: String },
      paymentMethod: { type: String },
      serviceProviderId: { type: String },
      description: { type: String },
      steps: [String],
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
