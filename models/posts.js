const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  customerId: { type: String },
  timestamp: { type: Date, default: Date.now },
  description: { type: String, required: true },
  location: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  cancelationFee: { type: String, required: true },
  imgSrc: { type: String, default: "" },
  tags: [String],
  proposal: [String],
});

module.exports = mongoose.model("Post", postSchema);
