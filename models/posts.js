const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  customerId: { type: String },
  timestamp: { type: Date, default: Date.now },
  description: { type: String, required: true },
  location: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  cancelationFee: { type: Number, required: true },
  tags: [String],
  proposal: [
    {
      proposalId: { type: String },
      postId: String,
      serviceProviderId: { type: String },
      description: { type: String },
      steps: [String],
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
