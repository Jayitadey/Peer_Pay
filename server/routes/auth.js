const express = require("express");
const router = express.Router();
const { signupUser, loginUser,verifyOtp} = require("../controllers/authController");

router.post("/signup", signupUser);
router.post("/login", loginUser);

// OTP verification route
router.post("/OTP",verifyOtp);

module.exports = router;