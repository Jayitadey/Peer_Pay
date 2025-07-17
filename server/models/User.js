//Login
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: {
    type: Number,
    default: 0

  },
  otp: String,
otpExpires: Date,
isVerified: { type: Boolean, default: false },
  
});

module.exports = mongoose.model("User", userSchema);