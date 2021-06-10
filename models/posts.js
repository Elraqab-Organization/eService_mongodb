const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  customerId: { type: String },
  timestamp: { type: Date, default: Date.now },
  description: { type: String, required: true },
  cancelationFee: { type: Number, required: true },
  tag: [String],
  proposal: [
    {
      proposalId: { type: String, required: true },
      postId: String,
      serviceProviderId: { type: String, required: true },
      description: { type: String, required: true },
      steps: [String],
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
