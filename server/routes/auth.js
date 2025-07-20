const express = require("express");
const router = express.Router();
const { signupUser, loginUser,verifyOtp,forgotpassword,resetPassword} = require("../controllers/authController");
console.log(typeof forgotpassword)
router.post("/signup", signupUser);
router.post("/login", loginUser);

// OTP verification route
router.post("/OTP",verifyOtp);

router.post("/forgot-password", forgotpassword);
router.post("/reset-password", resetPassword);
module.exports = router;
 
