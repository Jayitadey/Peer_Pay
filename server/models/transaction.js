const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Sender
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Optional, for transfers only
  },
  type: {
    type: String,
    enum: ["deposit", "withdraw", "transfer","received"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);