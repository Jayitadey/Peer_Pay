const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendemail");
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
exports.signupUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    return res.status(400).json({ msg: "Passwords do not match" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes from now

    const user = new User({
      username,
      email,
      password: hashed,
      otp,
      otpExpires,
      isVerified: false,
    });

    await user.save();

    try {
      await sendEmail(email, "Your OTP for PeerPay", `Your OTP is: ${otp}`);

      console.log(`🔐 OTP for ${email}: ${otp}`);
      return res.status(200).json({ msg: "OTP sent to your email" });
    } catch (err) {
      console.error("❌ Email sending error:", err);
      return res.status(500).json({ msg: "Failed to send OTP email" });
    }
  } catch (err) {
    console.error("❌ Server error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};
/*
exports.signupUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    return res.status(400).json({ msg: "Passwords do not match" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = Date.now() + 5 * 60 * 1000; // 5 min

    const user = new User({ username, email, password: hashed, otp, otpExpires, isVerified: false });
    await user.save();

    // TODO: Send OTP via email (use nodemailer or SMS service)
try {
    await sendEmail(email, "Your OTP for PeerPay", `Your OTP is: ${otp}`);

    // Save OTP in DB (if using a model), or in-memory for testing
    // Example:
    // await User.updateOne({ email }, { otp, otpExpires });

    res.status(200).json({ msg: "OTP sent successfully", otp }); // Don't send OTP in prod!
  } catch (err) {
    console.error("Email sending error:", err);
    res.status(500).json({ msg: "Failed to send OTP" });
  }

    console.log(`🔐 OTP for ${email}: ${otp}`);

    res.status(200).json({ msg: "OTP sent to your email for verification" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }

};
*/

//OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user: { id: user._id, username: user.username, email } });
  } catch (err) {
    res.status(500).json({ msg: "OTP verification failed" });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user: { id: user._id, username: user.username, email } });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }

 // const sendEmail = require("../utils/sendemail");
/*
exports.sendOtpToEmail = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000; // valid for 10 mins

  try {
    await sendEmail(email, "Your OTP for PeerPay", `Your OTP is: ${otp}`);

    // Save OTP in DB (if using a model), or in-memory for testing
    // Example:
    // await User.updateOne({ email }, { otp, otpExpires });

    res.status(200).json({ msg: "OTP sent successfully", otp }); // Don't send OTP in prod!
  } catch (err) {
    console.error("Email sending error:", err);
    res.status(500).json({ msg: "Failed to send OTP" });
  }
   
};
*/
};


